import type { Place } from "./types";

/** 보이는 장소와 표시 순서만 전달한다. 장소별 공개 URL·별점은 생성하지 않는다. */
export function aroundItemList(name: string, places: { place: Place; type: "Restaurant" | "TouristAttraction" }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: places.map(({ place, type }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": type, name: place.name, address: place.address },
    })),
  };
}
