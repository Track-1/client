import { useEffect } from "react";

export default function MobileAlertPage() {
  useEffect(() => {
    alert(
      "현재 모바일 버전은 준비중이에요!\n\nPC 환경에서 접속하시면 많은 뮤지션과 만나보실 수 있습니다.\n\n사이트 주소: www.track1.site\n\n\nThe mobile version is currently under preparation!\n\nIf you access it from a PC environment, you can meet many musicians.\n\n Website address: www.track1.site",
    );
  }, []);

  return <></>;
}
