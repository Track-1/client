import styled from "styled-components";
import PasswordContainer from "../../@common/passwordContainer";
import useUploadImageFile from "../../../hooks/common/useUploadImageFile";
import { UploadAbleBtnIc, UploadUnableBtnIc } from "../../../assets";
import useInputText from "../../../hooks/common/useInputText";
import { useUploadEvent } from "../../../hooks/queries/admin/event";

export default function EventUpload() {
  const [title, handleChangeTitle] = useInputText("");
  const { imageFile, handleUploadImageFile } = useUploadImageFile();
  const [startDate, handleChangeStartDate] = useInputText("");
  const [startTime, handleChangeStartTime] = useInputText("");
  const [endDate, handleChangeEndDate] = useInputText("");
  const [endTime, handleChangeEndTime] = useInputText("");
  const [introduction, handleChangeIntroduction] = useInputText("");

  const { uploadEvent } = useUploadEvent();

  function checkAbleState() {
    return title && imageFile && startDate && startTime && endDate && endTime;
  }

  function handleEventUpload() {
    const formData = new FormData();
    const eventImageFile = imageFile && new Blob([imageFile], { type: imageFile?.type });

    formData.append("eventTitle", title);
    eventImageFile && formData.append("eventImageFile", eventImageFile);
    formData.append("eventStartDate", startDate);
    formData.append("eventStartTime", startTime);
    formData.append("eventendDate", endDate);
    formData.append("eventEndTime", endTime);
    formData.append("eventIntroduction", introduction);

    uploadEvent(formData);
    console.log(formData);
  }

  return (
    <Styled.Container>
      <PasswordContainer
        height={98}
        containerInterval={6.6}
        title="이벤트 업로드"
        titleIntervalTop={7.5}
        titleIntervalBottom={2.8}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Styled.InputTitle>이벤트 제목</Styled.InputTitle>
            <Styled.Input onChange={handleChangeTitle} value={title} placeholder="이벤트 제목" />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputTitle>이벤트 사진</Styled.InputTitle>
            <Styled.Input type="file" accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG" onChange={handleUploadImageFile} />
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
      </PasswordContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.main`
    display: flex;
    justify-content: center;

    width: 100%;

    padding-top: 14.3rem;
  `,

  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;

    padding: 5rem 3rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: 5.5rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.heading20};
  `,

  InputTitle: styled.h2`
    width: 20rem;
  `,

  Input: styled.input`
    width: 100%;
    height: 100%;
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
