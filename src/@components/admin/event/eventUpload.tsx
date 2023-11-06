import styled from "styled-components";
import useUploadImageFile from "../../../hooks/common/useUploadImageFile";
import { UploadAbleBtnIc, UploadUnableBtnIc } from "../../../assets";
import useInputText from "../../../hooks/common/useInputText";
import { useGetEventDetail, usePatchEvent, useUploadEvent } from "../../../hooks/queries/admin/event";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../adminHeader";

export default function EventUpload() {
  const [title, handleChangeTitle, changeTitle] = useInputText("");
  const { imageFile, previewImage, changePreviewImage, handleUploadImageFile } = useUploadImageFile();
  const [startDate, handleChangeStartDate] = useInputText("");
  const [startTime, handleChangeStartTime] = useInputText("");
  const [endDate, handleChangeEndDate] = useInputText("");
  const [endTime, handleChangeEndTime] = useInputText("");
  const [introduction, handleChangeIntroduction, changeIntroduction] = useInputText("");

  const { eventId } = useParams();
  const { eventDetailData } = useGetEventDetail(eventId ? Number(eventId) : -1);

  const { uploadEvent } = useUploadEvent();
  const { patchEvent } = usePatchEvent();

  useEffect(() => {
    if (eventDetailData && eventId !== undefined) {
      changeTitle(eventDetailData?.eventTitle);
      changePreviewImage(eventDetailData?.eventImageFile);
      changeIntroduction(eventDetailData?.eventIntroduction || "");
    }
  }, [eventDetailData]);

  function checkAbleState() {
    return title && imageFile && startDate && startTime && endDate && endTime;
  }

  function getFormData() {
    const formData = new FormData();
    const eventImageFile = imageFile && new Blob([imageFile], { type: imageFile?.type });

    formData.append("eventTitle", title);
    eventImageFile && formData.append("eventImageFile", eventImageFile);
    formData.append("eventStartDate", startDate);
    formData.append("eventStartTime", startTime);
    formData.append("eventEndDate", endDate);
    formData.append("eventEndTime", endTime);
    formData.append("eventIntroduction", introduction);

    console.log(title, eventImageFile, startDate, startTime, endDate, endTime, introduction);

    return formData;
  }

  function handleEventUpload() {
    const formData = getFormData();

    eventDetailData && eventId !== undefined
      ? patchEvent({ formData: formData, eventId: Number(eventId) })
      : uploadEvent(formData);
  }

  return (
    <>
      <AdminHeader />
      <Styled.Container>
        <Styled.UploadContainer>
          <Styled.InputContainer>
            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 제목</Styled.InputTitle>
              <Styled.Input onChange={handleChangeTitle} value={title} placeholder="이벤트 제목" />
            </Styled.InputWrapper>

            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 사진</Styled.InputTitle>
              <Styled.ImageInputWrapper>
                <Styled.Input
                  type="file"
                  accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG"
                  onChange={handleUploadImageFile}
                />
                {previewImage && (
                  <Styled.ImageWrapper>
                    <Styled.EventImage src={previewImage} alt="이벤트 포스터 이미지" />
                  </Styled.ImageWrapper>
                )}
              </Styled.ImageInputWrapper>
            </Styled.InputWrapper>

            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 시작날짜</Styled.InputTitle>
              <Styled.Input onChange={handleChangeStartDate} value={startDate} placeholder="YYYY/MM/DD 형식으로 입력" />
            </Styled.InputWrapper>

            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 시작시간</Styled.InputTitle>
              <Styled.Input
                onChange={handleChangeStartTime}
                value={startTime}
                placeholder="HH:MM:SS 형식으로 입력 (설정하고 싶지 않은 경우 00:00:00)"
              />
            </Styled.InputWrapper>

            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 종료날짜</Styled.InputTitle>
              <Styled.Input onChange={handleChangeEndDate} value={endDate} placeholder="YYYY/MM/DD 형식으로 입력" />
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 종료시간</Styled.InputTitle>
              <Styled.Input
                onChange={handleChangeEndTime}
                value={endTime}
                placeholder="HH:MM:SS 형식으로 입력(설정하고 싶지 않은 경우 00:00:00)"
              />
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <Styled.InputTitle>이벤트 소개</Styled.InputTitle>
              <Styled.Introduce onChange={handleChangeIntroduction} value={introduction} placeholder="이벤트 소개" />
            </Styled.InputWrapper>
          </Styled.InputContainer>
          {checkAbleState() ? <Styled.UploadAbleBtnIcon onClick={handleEventUpload} /> : <Styled.UploadUnAbleBtnIcon />}
        </Styled.UploadContainer>
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.main`
    display: flex;
    justify-content: center;

    width: 100%;
  `,

  UploadContainer: styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 77.9rem;

    margin-top: 10rem;

    backdrop-filter: blur(1rem);
    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
      linear-gradient(to top, transparent, #3e4045);
    background-origin: border-box;
    background-clip: content-box, border-box;
  `,

  InputContainer: styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;

    width: 100%;
    height: 100%;

    padding: 5rem 3rem;
  `,

  InputWrapper: styled.li`
    display: flex;
    align-items: center;

    width: 100%;
    min-height: 6rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.alexandria_heading20};
  `,

  InputTitle: styled.h2`
    display: flex;
    align-items: center;

    width: 20rem;
    min-height: 6rem;

    margin: auto 0;
  `,

  ImageInputWrapper: styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;

    width: 100%;
  `,

  ImageWrapper: styled.div`
    width: 100%;
    height: 32rem;

    object-fit: cover;
    overflow: hidden;
  `,

  EventImage: styled.img`
    width: 100%;
  `,

  Input: styled.input`
    width: 100%;
    min-height: 6rem;
    padding: 0.5rem 2rem;

    ${({ theme }) => theme.fonts.input}
    color: white;

    border: 1px solid ${({ theme }) => theme.colors.main};
    border-radius: 1rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray2};
    }
  `,

  Introduce: styled.textarea`
    width: 100%;
    height: 12rem;
    padding: 0.5rem 2rem;

    ${({ theme }) => theme.fonts.input}
    color: white;

    border: 1px solid ${({ theme }) => theme.colors.main};
    border-radius: 1rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray2};
    }
  `,

  UploadAbleBtnIcon: styled(UploadAbleBtnIc)`
    margin: 3rem 0;

    cursor: pointer;
  `,
  UploadUnAbleBtnIcon: styled(UploadUnableBtnIc)`
    margin: 3rem 0;

    cursor: pointer;
  `,
};
