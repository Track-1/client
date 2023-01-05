import { PortfolioPropsType } from "../../type/profilePropsType";

export default function PortfoliosInform(props:PortfolioPropsType) {
  const isMe=props.isMe;
  const hoverId=props.hoverId;
  const clickId=props.clickId;
  const porftolios=props.portfolios;

  const portfolioInformation = porftolios.filter((portfolio) => portfolio.id === hoverId)[0];

  console.log(portfolioInformation)
  return (
    <>
    </>
  )
}
