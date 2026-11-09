import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const workflow = await readFile(new URL("../.github/workflows/close-develop-issues.yml", import.meta.url), "utf8");
const source = workflow.split("          script: |\n")[1].replace(/^ {12}/gm, "");
const run = new (Object.getPrototypeOf(async () => {}).constructor)("github", "context", "core", source);
const merged = (body, extra = {}) => ({ body, merged_at: "2026-11-09", base: { ref: "develop" }, merge_commit_sha: "merged-sha", ...extra });

async function check(prs, { ref = "refs/heads/develop", closed = [], pullRequests = [] } = {}) {
  const updated = [];
  let queries = 0;
  const github = {
    paginate: async (_method, params) => {
      queries++;
      assert.equal(params.commit_sha, "merged-sha");
      return prs;
    },
    rest: {
      repos: { listPullRequestsAssociatedWithCommit: () => {} },
      issues: {
        get: async ({ issue_number }) => ({ data: { state: closed.includes(issue_number) ? "closed" : "open", ...(pullRequests.includes(issue_number) ? { pull_request: {} } : {}) } }),
        update: async (params) => {
          assert.equal(params.owner, "jangwonyoon");
          assert.equal(params.repo, "stationkorea-web");
          assert.equal(params.state, "closed");
          assert.equal(params.state_reason, "completed");
          updated.push(params.issue_number);
        },
      },
    },
  };
  await run(github, { repo: { owner: "jangwonyoon", repo: "stationkorea-web" }, sha: "merged-sha", ref }, { info() {} });
  return { updated, queries };
}

assert.deepEqual((await check([merged("Closes #12\nFixes: #13\n- resolves #14\nCLOSED #12\nRefs #15")])).updated, [12, 13, 14]);
assert.deepEqual((await check([merged([
  "Refs #1", "> Closes #2", "`Closes #3`", "    Closes #4", "Closes owner/other#5",
  "Closes https://github.com/owner/other/issues/6", "Do not Closes #7", "Closes #8, Refs #9",
  "<!--\nCloses #10\n-->", "```md\nCloses #11\n```", "~~~\nCloses #12\n~~~",
  "````md\n```\nCloses #13\n````", "Closes #9007199254740992", "<!--\nCloses #14",
].join("\n"))])).updated, []);
assert.deepEqual((await check([merged("```\nCloses #1")])).updated, []);
assert.deepEqual((await check([merged("Closes #1", { merged_at: null }), merged("Closes #2", { base: { ref: "main" } }), merged("Closes #3", { merge_commit_sha: "other-sha" })])).updated, []);
assert.deepEqual((await check([merged(null)])).updated, []);
assert.deepEqual((await check([])).updated, []);
assert.deepEqual(await check([merged("Closes #1")], { ref: "refs/heads/main" }), { updated: [], queries: 0 });
assert.deepEqual((await check([merged("Closes #1\nCloses #2\nCloses #3")], { closed: [1], pullRequests: [2] })).updated, [3]);
console.log("PASS: develop merged-PR issue closure, exact directives, exclusions, deduplication and rerun safety.");
