// 구조화 데이터는 정적 HTML에 그대로 박는다. `<`를 이스케이프해 </script> 조기 종료를 막는다.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
