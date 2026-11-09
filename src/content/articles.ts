import { jongno3RitualMemory } from "./articles/jongno3-ritual-memory";
import { wangsimniCulturalSpaces } from "./articles/wangsimni-cultural-spaces";
import { dongjakLandscapeMemory } from "./articles/dongjak-landscape-memory";
import { articleGuideSourceIds, validateArticleGuide } from "../lib/article-guide";
import type { Source, StationSection, StationSign, LineId, Transfer, ReelCover, Station, Timeline, Comparison } from "./types";
import type { StationPhoto } from "./station-photos";
import { guriEscalator } from "./articles/guri-escalator";
import { expressTerminal } from "./articles/express-terminal";
import { seongsuBranch } from "./articles/seongsu-branch";
import { dongmyoWeekend } from "./articles/dongmyo-weekend";
import { gimpoPlanChange } from "./articles/gimpo-plan-change";
import { isuGuideTimes } from "./articles/isu-guide-times";
import { hongdaeTransfer } from "./articles/hongdae-transfer";
import { dongjakExpress } from "./articles/dongjak-express";
import { gimpoExtensionStatus } from "./articles/gimpo-extension-status";

import { ichonMuseumNeighborhood } from "./articles/ichon-museum-neighborhood";
import { seoulStationConnections } from "./articles/seoul-station-connections";
import { sindorimCulturalSpaces } from "./articles/sindorim-cultural-spaces";
import { wangsimniNeighborhood } from "./articles/wangsimni-neighborhood";
import { gangnamConnections } from "./articles/gangnam-connections";
import { ddpHistoryWalk } from "./articles/ddp-history-walk";
import { jongno3MusicHeritage } from "./articles/jongno3-music-heritage";
import { gongdeokConnections } from "./articles/gongdeok-connections";
import { gunjaMorningCrowding } from "./articles/gunja-morning-crowding";

export type ArticleFigure = {
  kind: "seongsu-current" | "seongsu-history";
  title: string;
  caption: string;
  descriptions: string[];
  sourceIds: string[];
};

export type MagazineArticle = {
  slug: string;
  section: StationSection;
  question: string;
  answer: string;
  answerSourceIds: string[];
  series?: { title: string; description: string };
  body: { heading: string; paragraphs: { text: string; sourceIds: string[] }[]; figure?: ArticleFigure; image?: StationPhoto; comparison?: Comparison; visual?: { src: string; width: number; height: number; alt: string; caption: string; sourceId: string; license: { name: string; url: string } }; scope?: { known: string; unknown: string } }[];
  station?: { name: string; lines: LineId[]; sign: StationSign; sourceIds: string[] };
  transfers?: Transfer[];
  timelines?: Timeline[];
  sources: Source[];
  related: { title: string; href: string }[];
  image?: StationPhoto;
  imagePlacement?: "body";
  cover?: ReelCover;
  reel?: Station["reel"];
  datePublished: string;
  dateModified: string;
  corrections?: { date: string; before: string; after: string; reason: string }[];
};

// 검증된 편만 등록한다. 릴스 게시 여부는 기사 발행 조건이 아니다.
export const articles: MagazineArticle[] = [jongno3RitualMemory, wangsimniCulturalSpaces, dongjakLandscapeMemory, guriEscalator, expressTerminal, seongsuBranch, dongmyoWeekend, gimpoPlanChange, isuGuideTimes, hongdaeTransfer, dongjakExpress, gimpoExtensionStatus, ichonMuseumNeighborhood, seoulStationConnections, sindorimCulturalSpaces, wangsimniNeighborhood, gangnamConnections, ddpHistoryWalk, jongno3MusicHeritage, gongdeokConnections, gunjaMorningCrowding];

for (const article of articles) {
  validateArticleGuide(article);
  const sourceIds = new Set(article.sources.map((source) => source.id));
  const citations = [articleGuideSourceIds(article), article.answerSourceIds, ...article.body.flatMap((section) => [...section.paragraphs.map((paragraph) => paragraph.sourceIds), section.figure?.sourceIds ?? [], section.visual ? [section.visual.sourceId] : [], section.comparison?.rows.flatMap((row) => row.sourceIds) ?? []])].flat();
  const missing = citations.filter((id) => !sourceIds.has(id));
  const uncited = article.sources.filter((source) => !citations.includes(source.id) || !source.url);
  if (!article.answerSourceIds.length || !article.body.length || article.related.length < 2 || missing.length || uncited.length) {
    throw new Error(`${article.slug}: 본문·답·관련 기사 2개와 유효한 출처가 필요합니다 (없는 출처: ${missing.join(", ")}; 미인용/URL 누락: ${uncited.map((source) => source.id).join(", ")})`);
  }
}

export const articlePath = (article: Pick<MagazineArticle, "slug">) => `/article/${article.slug}/`;
export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
