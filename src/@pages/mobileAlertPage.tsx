import { Suspense } from "react";
import Loading from "../@components/@common/loading";
import MobileLanding from "../@components/mobileLanding";

export default function MobileAlertPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MobileLanding />
    </Suspense>
  );
}
