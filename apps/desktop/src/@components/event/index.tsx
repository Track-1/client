import { useLocation } from "react-router-dom";
import Footer from "../@common/footer";
import MainHeader from "../main/renewal/mainHeader";
import EventList from "./eventList";
import HotEvent from "./hotEvent";
import EventDetail from "./eventDetail";
import styled from "styled-components";
import { ScrollTopBtnIc } from "../../assets";
import { useRef } from "react";

export default function Event() {
  const pathname = useLocation().pathname;

  const hotEventSectionRef = useRef<HTMLTableSectionElement>(null);

  function handleMoveHotEventSection() {
    hotEventSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <MainHeader />
      {pathname === "/event" ? (
        <>
          <HotEvent scrollRef={hotEventSectionRef} />
          <EventList />
        </>
      ) : (
        <EventDetail />
      )}
      <Styled.ScrollTopBtnIcon onClick={handleMoveHotEventSection} />
      <Footer />
    </>
  );
}

const Styled = {
  ScrollTopBtnIcon: styled(ScrollTopBtnIc)`
    position: fixed;

    bottom: 1.2rem;
    right: 10rem;

    cursor: pointer;
  `,
};
