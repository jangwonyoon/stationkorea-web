export const dynamic = "force-static";

// /version.txt — 이 빌드의 커밋 SHA. IndexNow Action이 production 반영 여부를 확인할 때 쓴다.
export function GET() {
  return new Response(process.env.VERCEL_GIT_COMMIT_SHA ?? "local", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
