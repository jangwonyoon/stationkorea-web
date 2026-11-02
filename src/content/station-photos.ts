/** 실제 역을 촬영한 사진. 원본 페이지와 이용 조건은 사진 바로 아래에 표시한다. */
export type StationPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  artist: string;
  source: string;
  license: string;
  licenseUrl: string;
};

export const stationPhotos: Record<string, StationPhoto> = {
  "seongsu-branch": { src: "/images/station/seongsu-photo.jpg", alt: "성수역 2호선 승강장에 정차한 열차와 승객", caption: "성수역 2호선 승강장, 2025년 촬영. 사진은 당시의 모습이며 선로 관계도를 대신하지 않습니다.", width: 1280, height: 720, artist: "Striker9498", source: "https://commons.wikimedia.org/wiki/File:20250708_%EC%84%B1%EC%88%98%EC%97%AD_%EC%8A%B9%EA%B0%95%EC%9E%A5.jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "guri-escalator": { src: "/images/station/guri-photo.jpg", alt: "구리역 환승통로와 방향 안내 표지", caption: "구리역 환승통로, 2024년 촬영. 사진만으로 통로의 거리와 높이를 판단할 수는 없습니다.", width: 1280, height: 1707, artist: "Striker9498", source: "https://commons.wikimedia.org/wiki/File:20240810_%EA%B5%AC%EB%A6%AC%EC%97%AD_%ED%99%98%EC%8A%B9%ED%86%B5%EB%A1%9C.jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "express-terminal": { src: "/images/station/express-terminal-photo.jpg", alt: "고속터미널역 7호선 승강장", caption: "고속터미널역 7호선 승강장. 촬영 당시의 모습으로 현재와 다를 수 있습니다.", width: 1280, height: 960, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-7-Express-Bus-Terminal-station-platform.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" },
  "dongmyo-weekend": { src: "/images/station/dongmyo-photo.jpg", alt: "동묘앞역 1호선 승강장", caption: "동묘앞역 1호선 승강장, 2018년 촬영. 열차 운행·안내는 현재와 다를 수 있습니다.", width: 1280, height: 720, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-metro-127-Dongmyo-station-platform-20181125-170430.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "gimpo-plan-change": { src: "/images/station/gimpo-photo.jpg", alt: "김포공항역 서해선 대합실", caption: "김포공항역 서해선 대합실, 2024년 촬영. 사진은 계획 변경 전후의 구조를 비교하는 자료가 아닙니다.", width: 1280, height: 960, artist: "MNXANL", source: "https://commons.wikimedia.org/wiki/File:202403_Seohae_Line_Concourse_of_Gimpo_International_Airport_Station.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "isu-guide-times": { src: "/images/station/isu-photo.jpg", alt: "총신대입구(이수)역 7호선 승강장", caption: "총신대입구(이수)역 7호선 승강장, 2019년 촬영. 안내 시간은 사진에서 확인할 수 없습니다.", width: 1280, height: 720, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-metro-736-Isu-station-platform-20191022-162752.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "hongdae-transfer": { src: "/images/station/hongdae-photo.jpg", alt: "홍대입구역 공항철도 승강장과 역명 표지", caption: "홍대입구역 공항철도 승강장. 촬영 당시의 모습으로 현재와 다를 수 있습니다.", width: 1280, height: 960, artist: "R151trains", source: "https://commons.wikimedia.org/wiki/File:AREX_Hongik_University_Station_platform.jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "dongjak-express": { src: "/images/station/dongjak-photo.jpg", alt: "동작역 지상 승강장과 열차", caption: "동작역 지상 승강장, 2019년 촬영. 사진은 급행 운행 여부를 설명하는 자료가 아닙니다.", width: 1280, height: 720, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-metro-431-Dongjak-station-platform-20191022-155014.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "jamsil": { src: "/images/station/jamsil-photo.jpg", alt: "잠실역 8호선 승강장과 역명 표지", caption: "잠실역 8호선 승강장, 2025년 촬영. 사진만으로 2호선과의 환승 경로를 판단할 수는 없습니다.", width: 1280, height: 720, artist: "Striker9498", source: "https://commons.wikimedia.org/wiki/File:20250708_8%ED%98%B8%EC%84%A0_%EC%9E%A0%EC%8B%A4%EC%97%AD_%EC%8A%B9%EA%B0%95%EC%9E%A5.jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "sadang": { src: "/images/station/sadang-photo.jpg", alt: "사당역 2호선 승강장과 역명 표지", caption: "사당역 2호선 승강장, 2018년 촬영. 방면별 하차 위치는 본문의 최신 안내를 확인해 주세요.", width: 1280, height: 720, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-metro-226-Sadang-station-platform-20181121-131130.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "konkuk-univ": { src: "/images/station/konkuk-univ-photo.jpg", alt: "건대입구역 지상 2호선 승강장", caption: "건대입구역 2호선 승강장, 2018년 촬영. 사진은 7호선과의 높이 차이를 직접 보여 주지 않습니다.", width: 1280, height: 720, artist: "LERK", source: "https://commons.wikimedia.org/wiki/File:Seoul-metro-212-Konkuk-university-station-platform-20181123-084126.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
};

export const stationPhotoCredit = (photo: StationPhoto) => `사진: ${photo.artist}, Wikimedia Commons (${photo.source}), ${photo.license} (${photo.licenseUrl}), 크기 조정.`;
