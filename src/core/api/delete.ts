import axios from "axios";

export async function deleteTrack(beatId: string | undefined) {
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        beatId: beatId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteVocalPortfolio(portfolioId: number) {
  alert(portfolioId);
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mypage/vocal/${portfolioId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`,
        vocalPortfolioId: portfolioId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProducerPortfolio(portfolioId: number) {
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mypage/producer/${portfolioId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        producerPortfolioId: portfolioId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTrackComment(commentId: string | undefined) {
  //케이스별로 토큰값 바꿔줘야할듯!!
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        commentId: commentId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
