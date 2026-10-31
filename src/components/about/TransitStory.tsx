import Image from "next/image";
import Link from "next/link";
import { TransitMotion } from "./TransitMotion.client";
import { BusIllustration, TrainIllustration } from "./TransitVehicles";
import { aboutNetwork as network } from "@/content/about-photos";

/** The vehicles are editorial illustrations, not a diagram of a specific route. */
export function TransitStory() {
  return (
    <>
      <TransitMotion />
      <section data-transit-scene="rail" aria-labelledby="transit-story-title" className="transit-rail-scene overflow-clip bg-ground text-ink">
        <div className="page-wrap pt-10 md:pt-8">
          <p className="border-t border-rule pt-5 text-label">출발은, 늘 오가던 길.</p>
          <h2 id="transit-story-title" className="transit-title mt-8 scroll-mt-20">
            <span className="block">매일 타는 열차에서,</span>
            <span className="block">매일 사는 동네로.</span>
          </h2>
          <p className="mt-6 max-w-xl text-body">열차와 버스로 오가고, 두 발로 머무는 곳.<br />익숙한 이동의 구조에서, 길 위의 생활로 시선을 옮깁니다.</p>
        </div>
        <div className="transit-railway mt-8" aria-hidden="true">
          <div className="transit-train" data-transit-motion="train">
            <TrainIllustration />
          </div>
          <div className="transit-track" />
        </div>
        <div className="page-wrap flex items-center gap-4 pb-8 pt-4">
          <span className="h-2 w-2 shrink-0 rounded-full bg-line-2" aria-hidden="true" />
          <p className="text-caption text-ink-2">우리가 오가는 길의 구조를 읽습니다.</p>
        </div>
      </section>

      <section data-transit-scene="network" aria-labelledby="transit-network-title" className="overflow-clip py-10">
        <div className="page-wrap grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-label">하나의 길에서, 더 넓은 연결로.</p>
            <h3 id="transit-network-title" className="about-chapter-title mt-6 scroll-mt-20">선이 만나고,<br />생활이 이어집니다.</h3>
            <p className="mt-6 max-w-md text-body text-ink-2">한 정거장 너머에는 또 다른 동네가 있습니다. 서울의 지하철 노선도에서, 매일의 이동이 모여 이루는 연결을 살펴봅니다.</p>
            <div className="transit-road-scene mt-4 max-w-sm" aria-hidden="true">
              <div className="transit-bus" data-transit-motion="bus">
                <BusIllustration />
              </div>
              <div className="transit-road"><span className="transit-road-markings" /></div>
            </div>
            <p className="mt-6 max-w-sm text-body text-ink-2">열차를 내려, 동네의 속도로.<br />길 위의 생활로 시선을 옮깁니다.</p>
          </div>
          <figure className="w-full max-w-lg justify-self-end" data-transit-motion="map">
            <div className="overflow-clip rounded-xl border border-rule bg-plate p-3 md:p-4">
              <Image src={network.src} width={network.width} height={network.height} alt={network.alt} sizes="(min-width: 1152px) 478px, (min-width: 768px) calc((100vw - 112px) / 2 - 34px), calc(100vw - 66px)" className="h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-caption">{network.place}</figcaption>
          </figure>
        </div>
        <div className="page-wrap mt-4">
          <Link href="#perspectives" className="inline-flex min-h-11 items-center text-label underline underline-offset-4">익숙한 풍경을 읽는 네 가지 시선 <span aria-hidden="true" className="ml-2">↓</span></Link>
        </div>
      </section>
    </>
  );
}
