import { PageType } from "../../../type/common/pageType";
import TrackSearchHeaderNav from "./trackSearchHeaderNav";
import TrackSearchHeaderButton from "./trackSearchHeaderButton";

interface TrackSearchHeaderProps {
  pageType: PageType;
  changeType: (pageType: PageType) => void;
}

export default function TrackSearchHeader(props: TrackSearchHeaderProps) {
  const { pageType, changeType } = props;

  return (
    <>
      <TrackSearchHeaderNav pageType={pageType} changeType={changeType} />
      <TrackSearchHeaderButton />
    </>
  );
}
