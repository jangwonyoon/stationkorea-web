/** 숫자 문자열 조각. `num`은 숫자(쉼표·소수점 포함), 나머지는 단위·접두어·기호. */
export type NumberPart = { text: string; num: boolean };

/**
 * "3분 22초" → [3][분 ][22][초], "160,478명" → [160,478][명].
 * 원문을 바꾸지 않고 자르기만 하므로 조각을 이어 붙이면 원문과 같다.
 */
export function splitNumber(value: string): NumberPart[] {
  // 캡처 그룹으로 split하면 홀수 번째 조각이 숫자다.
  return value
    .split(/(\d(?:[\d,.]*\d)?)/)
    .map((text, i) => ({ text, num: i % 2 === 1 }))
    .filter((part) => part.text !== "");
}
