import type { LineId } from "@/content/lines";
import { stations } from "@/content/stations";

export const publishedLines = [...new Set(stations.flatMap((station) => station.lines))].sort();

export function linePath(id: LineId) {
  return `/line/${id}/`;
}

export function lineStations(id: LineId) {
  return stations.filter((station) => station.lines.includes(id));
}

export function lineLastModified(id: LineId) {
  return lineStations(id).map((station) => station.dateModified).sort().at(-1);
}
