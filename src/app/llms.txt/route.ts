import { stationPath, stations } from "@/content/stations";
import { markdownPath } from "@/lib/markdown";
import { absoluteUrl, site } from "@/lib/site";
import { linePath, publishedLines } from "@/app/line/data";
import { lineName } from "@/content/lines";

export const dynamic = "force-static";

// /llms.txt — 기사 목록을 콘텐츠에서 만들어 사이트와 어긋나지 않게 한다.
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description} 갈아타다·걷다·보다·바뀌다, 네 가지 시선으로 교통·길·장소·변화를 살핀다. 숫자마다 기관·자료명·기준일을 출처로 적는다.`,
    "",
    `현재 공개된 기사는 서울 지하철의 ${stations.map((s) => s.name).join("·")}을 다룬 ${stations.length}편이며, ‘갈아타다’에 속한다. 다른 섹션은 준비 중이다. 인스타그램 ${site.instagramHandle}에서도 매일 그 길을 만날 수 있다.`,
    "",
    "## 출처 정책",
    "- 숫자는 서울교통공사·서울 열린데이터광장·공공데이터포털 등 공식 자료를 우선하고, 기준일을 함께 적는다.",
    "- 3D 단면 영상과 썸네일 배경은 AI로 생성한 참고 시각화이며 실제 구조·치수와 다를 수 있다. 대본·숫자·출처는 사람이 썼다.",
    "",
    "## 역 기사",
    ...stations.map((s) => `- [${s.question}](${absoluteUrl(stationPath(s))}): ${s.answer} 마크다운: ${absoluteUrl(markdownPath(s))}`),
    "",
    "## 전문",
    `- [모든 기사 전문](${absoluteUrl("/llms-full.txt")})`,
    "",
    "## 노선별 질문",
    ...publishedLines.map((id) => `- [${lineName(id)}](${absoluteUrl(linePath(id))}): 발행된 역 기사 모음`),
    "",
    "## 소개",
    `- [운영자·출처·정정 정책·AI 사용 범위](${absoluteUrl("/about/")}): 글 ${site.author.name}, 문의 ${site.email}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
