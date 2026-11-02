import type { Metadata } from "next";
import { ArticleArchive } from "@/components/articles/ArticleArchive";
import { articleEntries } from "@/lib/article-index";
import { site } from "@/lib/site";
import { stationPhotos } from "@/content/station-photos";
const title = "전체 기사";
const description = `${site.name}에서 발행한 기사 ${articleEntries.length}편을 최신 게시일순으로 모았습니다.`;
export const metadata: Metadata = { title, description, alternates: { canonical: "/articles/" }, openGraph: { type: "website", title, description, url: "/articles/", images: [stationPhotos["seongsu-branch"].src] } };
export default function ArticlesPage() { return <ArticleArchive title={title} description={description} path="/articles/" entries={articleEntries} />; }
