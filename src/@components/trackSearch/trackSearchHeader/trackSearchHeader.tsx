import PageTypeNav from "./PageTypeNav";
import TrackSearchHeaderButton from "./trackSearchHeaderButton";
import styled from "styled-components";
import { PageType } from "../../../type/common/pageType";

interface TrackSearchHeaderProps {
  pageType: PageType;
}

export default function TrackSearchHeader(props: TrackSearchHeaderProps) {
  const { pageType } = props;

  return (
    <HeaderWrapper>
      <PageTypeNav pageType={pageType} />
      <TrackSearchHeaderButton />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  margin-left: 56.2rem;
`;
