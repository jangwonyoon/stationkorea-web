import type { LineId, StationSign, Transfer } from "../content/types";

/** 방면은 인접 역으로 바꾸지 않는다. 합쳐진 방면 문자열도 임의로 분리하지 않는다. */
export function stationSignDirections(lines: LineId[], sign: StationSign, transfers: Transfer[] = []) {
  const endpoints = transfers.flatMap((transfer) => [transfer.ride, transfer.to]);
  const crossings = lines.filter((line) => line !== sign.line).map((line) => {
    const directions = [...new Set(endpoints
      .filter((endpoint) => endpoint.line === line && endpoint.direction.endsWith(" 방면") && !endpoint.direction.includes("·"))
      .map((endpoint) => endpoint.direction))];
    return { line, directions: directions.length === 2 ? directions : [] };
  });
  const branches = [...new Set(endpoints
    .filter((endpoint) => endpoint.line === sign.line && endpoint.direction.includes("지선"))
    .map((endpoint) => endpoint.direction))];
  return { crossings, branches };
}
