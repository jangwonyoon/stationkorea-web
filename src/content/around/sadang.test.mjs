import assert from "node:assert/strict";
import { sadangCongestion, sadangExits, sadangPlaces, sadangReview } from "./sadang.ts";

assert.equal(new Set(sadangPlaces.map((place) => place.id)).size, 8);
for (const place of sadangPlaces) {
  assert.ok(place.name && place.address && place.designation.agency);
  assert.equal(place.asOf, place.designation.source.asOf);
  assert.ok(place.designation.source.license);
  assert.equal(new URL(place.designation.source.url).protocol, "https:");
  assert.equal(place.exit, null);
  assert.equal(place.walkMinutes, null);
  assert.ok(decodeURIComponent(place.maps.naver).includes(place.address));
  assert.ok(decodeURIComponent(place.maps.kakao).includes(place.name));
  if (place.designation.name === "착한가격업소") {
    assert.equal(place.designation.year, null);
    assert.ok(place.menu.priceWon > 0);
  } else {
    assert.ok(Number.isInteger(place.designation.year));
    assert.ok(place.menu === null || place.menu.priceWon === null);
  }
}
assert.equal(sadangReview.candidates, "pending");
assert.equal(sadangReview.walkingMeasurement, "pending");
assert.equal(sadangReview.exitMapping, "pending");
assert.deepEqual(sadangExits.map(({ exit }) => exit), Array.from({ length: 14 }, (_, i) => i + 1));
assert.ok(sadangExits.every(({ status, placeIds }) => status === "pending" && placeIds.length === 0));
assert.equal(sadangCongestion.times.length, 39);
sadangCongestion.times.forEach((time, index) => {
  const [hour, minute] = time.split(":").map(Number);
  assert.equal((hour * 60 + minute + 1440 - 330) % 1440, index * 30);
});
assert.equal(sadangCongestion.rows.length, 12);
assert.equal(new Set(sadangCongestion.rows.map(({ day, line, direction }) => `${day}/${line}/${direction}`)).size, 12);
for (const row of sadangCongestion.rows) {
  assert.ok(["평일", "토요일", "일요일"].includes(row.day));
  assert.ok(row.line === "2호선" ? ["내선", "외선"].includes(row.direction) : ["상선", "하선"].includes(row.direction));
  assert.equal(row.stationNumber, row.line === "2호선" ? "226" : "433");
  assert.equal(row.percentages.length, sadangCongestion.times.length);
  assert.ok(row.percentages.every((value) => Number.isFinite(value) && value >= 0));
}
assert.equal(sadangCongestion.rows[0].percentages[0], 16.5);
assert.equal(sadangCongestion.rows[1].percentages[5], 144.8);
console.log("사당 후보·미확인 필드·혼잡도 12행 검증 통과");
