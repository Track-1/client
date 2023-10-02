import { PageType } from "../../../type/common/pageType";
import TrackSearchHeaderNav from "./trackSearchHeaderNav";
import TrackSearchHeaderButton from "./trackSearchHeaderButton";

interface TrackSearchHeaderProps {
  pageType: PageType;
  handleChangeType: (pageType : PageType) => void;
}

export default function TrackSearchHeader(props: TrackSearchHeaderProps) {
  const { pageType, handleChangeType } = props;

  return (
    <>
      <TrackSearchHeaderNav pageType={pageType} handleChangeType={handleChangeType} />
      <TrackSearchHeaderButton />
    </>
  );
}
