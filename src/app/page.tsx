import { site } from "@/lib/site";

// 홈(E안) 자리. 역 기사(F안)는 /station/<역>/ 으로 추가한다. 디자인은 Claude Design에서 확정 예정.
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-neutral-500">{site.name}</p>
      <h1 className="mt-1 text-2xl font-bold">매일 지나는 그 역, 왜 이렇게 생겼을까</h1>
      <p className="mt-3 text-neutral-700">{site.description}</p>
      <p className="mt-6 text-sm text-neutral-500">
        준비 중입니다. 영상은 <a className="underline" href={site.instagram}>인스타그램 @maeil.geugil</a>에서 볼 수 있습니다.
      </p>
    </main>
  );
}
