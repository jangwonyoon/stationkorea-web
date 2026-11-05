import type { StationPhoto } from "@/content/station-photos";

export function StationPhotoCaption({ photo }: { photo: StationPhoto }) {
  return <figcaption className="mt-2 text-caption">
    {photo.caption} <span className="block">사진 <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.artist} · {photo.provider ?? "Wikimedia Commons"}<span className="sr-only"> (새 창)</span></a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.license}<span className="sr-only"> (새 창)</span></a> · 크기 조정</span>
  </figcaption>;
}
