import Image from "next/image";
import Link from "next/link";
import { aboutPhotos, type AboutPhoto } from "@/content/about-photos";

function PhotoCaption({ photo }: { photo: AboutPhoto }) {
  return <figcaption className="mt-3 text-caption">{photo.place}</figcaption>;
}

export function PhotoStory() {
  return (
    <section id="perspectives" aria-labelledby="perspectives-title" className="scroll-mt-20">
      <div className="page-wrap pb-6 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-4">
          <h2 id="perspectives-title" className="text-label">길을 읽는 네 가지 시선</h2>
          <Link href="#sources-policy" className="inline-flex min-h-11 items-center text-label underline underline-offset-4">
            읽을 수 있는 근거로 <span aria-hidden="true" className="ml-2">↓</span>
          </Link>
        </div>
      </div>

      <section aria-labelledby="about-transfer-title" className="about-chapter page-wrap relative py-10 md:py-16">
        <span aria-hidden="true" className="about-chapter-rule absolute inset-x-0 top-0 h-px bg-ink" />
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-x-8 xl:gap-x-12">
          <div className="about-story-copy md:col-span-5">
            <p className="mb-8 flex items-baseline gap-4 text-label md:mb-12"><span className="text-ink-3" aria-hidden="true">01</span><span>#갈아타다</span></p>
            <h3 id="about-transfer-title" className="about-chapter-title scroll-mt-20">어떻게<br />이어져 있을까.</h3>
            <p className="mt-6 max-w-sm text-body text-ink-2">
              목적지 사이에는 수많은 길이 있습니다. 선로와 승강장, 길과 길이 만나는 구조를 살펴봅니다.
            </p>
            <Link href="/section/transfer/" className="mt-6 inline-flex min-h-11 items-center text-label underline underline-offset-4">
              지금, 역 기사 읽기 <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
          <figure className="w-full max-w-lg justify-self-end md:col-span-7">
            <div className="overflow-clip rounded-xl bg-slab">
              <Image src={aboutPhotos.rail.src} width={aboutPhotos.rail.width} height={aboutPhotos.rail.height} alt={aboutPhotos.rail.alt} sizes="(min-width: 1024px) 512px, (min-width: 768px) 54vw, calc(100vw - 40px)" className="about-photo-reveal h-auto w-full" />
            </div>
            <PhotoCaption photo={aboutPhotos.rail} />
          </figure>
        </div>
      </section>

      <section aria-labelledby="about-walk-title" className="about-chapter page-wrap relative py-10 md:py-16">
        <span aria-hidden="true" className="about-chapter-rule absolute inset-x-0 top-0 h-px bg-ink" />
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-x-8 xl:gap-x-12">
          <div className="about-story-copy md:col-span-5 md:col-start-8 md:row-start-1">
            <p className="mb-8 flex items-baseline gap-4 text-label md:mb-12"><span className="text-ink-3" aria-hidden="true">02</span><span>#걷다</span></p>
            <h3 id="about-walk-title" className="about-chapter-title scroll-mt-20">한 걸음<br />더 가 보면.</h3>
            <p className="mt-6 max-w-sm text-body text-ink-2">
              지나치던 골목에도 생활이 있습니다. 길을 오가는 사람들, 작은 가게와 동네의 일상을 가까이 봅니다.
            </p>
            <p className="mt-6 text-caption">이야기를 준비하고 있습니다.</p>
          </div>
          <figure className="w-full max-w-lg md:col-span-7 md:col-start-1 md:row-start-1">
            <div className="overflow-clip rounded-xl bg-slab">
              <Image src={aboutPhotos.street.src} width={aboutPhotos.street.width} height={aboutPhotos.street.height} alt={aboutPhotos.street.alt} sizes="(min-width: 1024px) 512px, (min-width: 768px) 54vw, calc(100vw - 40px)" className="about-photo-reveal h-auto w-full" />
            </div>
            <PhotoCaption photo={aboutPhotos.street} />
          </figure>
        </div>
      </section>

      <section aria-labelledby="about-see-title" className="about-chapter relative bg-slab py-12 md:py-20">
        <div className="page-wrap">
          <span aria-hidden="true" className="about-chapter-rule absolute inset-x-0 top-0 h-px bg-ink" />
          <p className="mb-8 flex items-baseline gap-4 text-label md:mb-12"><span className="text-ink-3" aria-hidden="true">03</span><span>#보다</span></p>
          <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end md:gap-12">
            <h3 id="about-see-title" className="about-chapter-title scroll-mt-20">잠시 멈추면<br />보이는 것들.</h3>
            <div>
              <p className="max-w-sm text-body text-ink-2">멀리서 본 풍경과 가까이 본 공간은 다릅니다. 형태와 쓰임을 살피며, 익숙한 장소에 머물 이유를 찾습니다.</p>
              <p className="mt-6 text-caption">이야기를 준비하고 있습니다.</p>
            </div>
          </div>
          <figure>
            <div className="overflow-clip rounded-xl">
              <Image src={aboutPhotos.space.src} width={aboutPhotos.space.width} height={aboutPhotos.space.height} alt={aboutPhotos.space.alt} sizes="(min-width: 1280px) 1200px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)" className="about-photo-reveal h-auto w-full" />
            </div>
            <PhotoCaption photo={aboutPhotos.space} />
          </figure>
        </div>
      </section>

      <section aria-labelledby="about-change-title" className="about-chapter page-wrap relative py-12 md:py-20">
        <span aria-hidden="true" className="about-chapter-rule absolute inset-x-0 top-0 h-px bg-ink" />
        <p className="mb-8 flex items-baseline gap-4 text-label md:mb-12"><span className="text-ink-3" aria-hidden="true">04</span><span>#바뀌다</span></p>
        <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end md:gap-12">
          <h3 id="about-change-title" className="about-chapter-title scroll-mt-20">길의 쓰임은<br />달라진다.</h3>
          <div>
            <p className="max-w-sm text-body text-ink-2">같은 길도 시간이 지나면 다르게 쓰입니다. 남아 있는 흔적과 새로운 생활을 함께 살피며, 달라진 이유를 묻습니다.</p>
            <p className="mt-6 text-caption">이야기를 준비하고 있습니다.</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl border-t-4 border-line-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5">
            <p className="text-label">서울로 7017</p>
            <p className="text-caption">낮과 저녁, 같은 길</p>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-2">
            <figure className="about-change-photo w-full justify-self-center">
              <Image src={aboutPhotos.changeDay.src} width={aboutPhotos.changeDay.width} height={aboutPhotos.changeDay.height} alt={aboutPhotos.changeDay.alt} sizes="(min-width: 1088px) 500px, (min-width: 768px) calc((100vw - 88px) / 2), calc(100vw - 40px)" className="h-auto w-full rounded-lg" />
              <PhotoCaption photo={aboutPhotos.changeDay} />
            </figure>
            <figure className="about-change-photo w-full justify-self-center">
              <Image src={aboutPhotos.changeEvening.src} width={aboutPhotos.changeEvening.width} height={aboutPhotos.changeEvening.height} alt={aboutPhotos.changeEvening.alt} sizes="(min-width: 1088px) 500px, (min-width: 768px) calc((100vw - 88px) / 2), calc(100vw - 40px)" className="h-auto w-full rounded-lg" />
              <PhotoCaption photo={aboutPhotos.changeEvening} />
            </figure>
          </div>
          <p className="mt-6 border-t border-rule pt-5 text-caption">차가 다니던 고가도로가 사람이 걷는 길로 바뀐 공간입니다. 사진은 서울로 7017의 낮과 저녁을 담았습니다.</p>
        </div>
      </section>
    </section>
  );
}
