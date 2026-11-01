import { articleGuideSourceIds, validateArticleGuide } from "../lib/article-guide";
import type { Source, StationSection, StationSign, LineId, Transfer, ReelCover, Station } from "./types";
import { guriEscalator } from "./articles/guri-escalator";
import { expressTerminal } from "./articles/express-terminal";
import { seongsuBranch } from "./articles/seongsu-branch";
import { dongmyoWeekend } from "./articles/dongmyo-weekend";
import { gimpoPlanChange } from "./articles/gimpo-plan-change";
import { isuGuideTimes } from "./articles/isu-guide-times";
import { hongdaeTransfer } from "./articles/hongdae-transfer";
import { dongjakExpress } from "./articles/dongjak-express";

export type MagazineArticle = {
  slug: string;
  section: StationSection;
  question: string;
  answer: string;
  answerSourceIds: string[];
  body: { heading: string; paragraphs: { text: string; sourceIds: string[] }[] }[];
  station?: { name: string; lines: LineId[]; sign: StationSign; sourceIds: string[] };
  transfers?: Transfer[];
  sources: Source[];
  related: { title: string; href: string }[];
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  cover?: ReelCover;
  reel?: Station["reel"];
  datePublished: string;
  dateModified: string;
  corrections?: { date: string; before: string; after: string; reason: string }[];
};

// 검증된 편만 등록한다. 릴스 게시 여부는 기사 발행 조건이 아니다.
export const articles: MagazineArticle[] = [guriEscalator, expressTerminal, seongsuBranch, dongmyoWeekend, gimpoPlanChange, isuGuideTimes, hongdaeTransfer, dongjakExpress];

for (const article of articles) {
  validateArticleGuide(article);
  const sourceIds = new Set(article.sources.map((source) => source.id));
  const citations = [articleGuideSourceIds(article), article.answerSourceIds, ...article.body.flatMap((section) => section.paragraphs.map((paragraph) => paragraph.sourceIds))].flat();
  const missing = citations.filter((id) => !sourceIds.has(id));
  const uncited = article.sources.filter((source) => !citations.includes(source.id) || !source.url);
  if (!article.answerSourceIds.length || !article.body.length || article.related.length < 2 || missing.length || uncited.length) {
    throw new Error(`${article.slug}: 본문·답·관련 기사 2개와 유효한 출처가 필요합니다 (없는 출처: ${missing.join(", ")}; 미인용/URL 누락: ${uncited.map((source) => source.id).join(", ")})`);
  }
}

export const articlePath = (article: Pick<MagazineArticle, "slug">) => `/article/${article.slug}/`;
export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
