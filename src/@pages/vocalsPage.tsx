import { useRecoilState } from "recoil";
import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import { Category } from "../core/common/categoryHeader";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

export default function VocalsPage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);

  setWhom(Category.VOCALS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요

  return (
    <>
      <CategoryHeader />
      <CategoryList />
    </>
  );
}
