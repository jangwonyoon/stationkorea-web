import type { Metadata } from "next";
import { ArticleArchive } from "@/components/articles/ArticleArchive";
import { articleEntries } from "@/lib/article-index";
const title = "전체 기사";
const description = "갈아타다·걷다·보다·바뀌다. 매일 그 길의 모든 기사를 최신 게시일순으로 읽습니다.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/articles/" }, openGraph: { type: "website", title, description, url: "/articles/" } };
export default function ArticlesPage() { return <ArticleArchive title={title} description={description} path="/articles/" entries={articleEntries} />; }
