import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { EventModalIc } from "../../assets";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { openEventModal } from "../../recoil/conventionModal";

export default function ConventionModal() {
  const [showModal, setShowModal] = useRecoilState<boolean>(openEventModal);

  function closeModal() {
    setShowModal(false);
  }

  const closePopup = (expireDays: number) => {
    let expire = new Date();
    expire.setTime(expire.getTime() + expireDays * 24 * 60 * 60 * 1000);
    localStorage.setItem("popupNoShow", "" + expire.getTime());
  };

  const checkPopupClose = () => {
    const expireDay = localStorage.getItem("popupNoShow");
    let today = new Date();

    if (!expireDay || today.getTime() > parseInt(expireDay)) {
      return false;
    } else {
      return true;
    }
  };

  const closeModalToday = () => {
    closePopup(1);
    setShowModal(false);
  };

  useEffect(() => {
    checkPopupClose() ? setShowModal(false) : setShowModal(true);
  }, []);

  return (
    <ModalBackground>
      <EventImg>
        <a href="https://forms.gle/swmXaVdsoX4ZHwF68">
          <img className="event" alt="iPhone_01" src="eventModal/eventModalImg.png" />
        </a>
        <EventModalIcon onClick={closeModal} />
        <ModalFooter onClick={closeModalToday}>하루동안 보지 않기</ModalFooter>
      </EventImg>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 100;

  width: 192rem;
  height: 108rem;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5rem);
`;

const EventImg = styled.div`
  position: fixed;
  .event {
    width: 50rem;
  }
`;

const ModalFooter = styled.div`
  cursor: pointer;
  position: absolute;

  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  text-align: center;
  text-decoration: underline;
  text-underline-position: under;

  bottom: 0;
  width: 50rem;
`;

const EventModalIcon = styled(EventModalIc)`
  cursor: pointer;

  position: absolute;
  right: 2.5rem;
  top: 4rem;
`;
