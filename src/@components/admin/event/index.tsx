import styled from "styled-components";
import { useDeleteEvent, useGetEventList, usePatchEvent } from "../../../hooks/queries/admin/event";
import EventInfo from "../../main/renewal/eventInfo";
import { EditBtnIc, UploadAbleBtnIc } from "../../../assets";
import EditModal from "../../@common/modal/editModal";
import { SelectBox } from "../../@common/selectBox";
import { useSelect } from "../../../hooks/common/useSelect";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../adminHeader";
import Footer from "../../@common/footer";

export default function AdminEvent() {
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const navigate = useNavigate();

  const { deleteEvent } = useDeleteEvent();

  const { selectedOption, selectOption, isSelecBoxOpen, toggleBoxOpen } = useSelect();

  function handleMoveEventUpload(eventId?: number) {
    eventId !== undefined ? navigate(`/admin/event/upload/${eventId}`) : navigate("/admin/event/upload");
  }

  function handleDeleteEvent(deleteId: number) {
    deleteEvent(deleteId);
  }

  function openEditModal(eventId: number) {
    selectOption(eventId);
    toggleBoxOpen();
  }

  return (
    <>
      <AdminHeader />
      <Styled.EventContainer>
        <Styled.EventListContainer>
          {eventListData?.map((event) => (
            <Styled.EventInfoWrapper key={event.eventId}>
              <EventInfo
                eventImage={event.eventImageFile}
                eventPeriod={event.eventDate}
                eventTitle={event.eventTitle}
                eventId={event.eventId}
              />
              <Styled.EditIcon onClick={() => openEditModal(event.eventId)} />
              <Styled.EditModalWrapper>
                <SelectBox defaultOpen>
                  {selectedOption === event.eventId && isSelecBoxOpen && (
                    <EditModal
                      handleEditFn={handleMoveEventUpload}
                      handleDeleteFn={handleDeleteEvent}
                      id={event.eventId}
                    />
                  )}
                </SelectBox>
              </Styled.EditModalWrapper>
            </Styled.EventInfoWrapper>
          ))}
        </Styled.EventListContainer>
        <Styled.UploadIcon onClick={() => handleMoveEventUpload()} />
      </Styled.EventContainer>
      <Footer />
    </>
  );
}

const Styled = {
  EventContainer: styled.main`
    position: relative;
    width: 100%;
    height: 100vh;

    padding: 0 10rem;

    margin: 10rem 0 20rem;
  `,

  EventListContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    width: 100%;
  `,

  EventInfoWrapper: styled.div`
    position: relative;
  `,

  UploadIcon: styled(UploadAbleBtnIc)`
    position: fixed;

    right: 10rem;
    bottom: 5rem;

    width: 24.6rem;

    cursor: pointer;
  `,

  EditIcon: styled(EditBtnIc)`
    position: absolute;
    right: 0;
    top: 59.2rem;

    width: 4rem;

    cursor: pointer;
  `,

  EditModalWrapper: styled.div`
    position: absolute;
    top: 64.8rem;
    right: 0;
  `,
};
