import { useState } from "react";
import { useForm } from "react-hook-form";
import { CONVENTION_SELECTED_CHECK } from "../../core/common/convention/conventionSelectedCheck";
import { ConventionChecksType } from "../../type/signUp/conventionChecksType";
import ConventionCheckBox from "./conventionCheckBox";
import NickName from "./nickName";
import ProfilImageContainer from "./profileImageContainer";

export default function NicknameConvention() {
  const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(CONVENTION_SELECTED_CHECK);

  const methods = useForm({
    defaultValues: {
      nickName: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  return (
    <>
      <ProfilImageContainer />
      <NickName methods={methods} checkedConventions={checkedConventions} />
      <ConventionCheckBox
        nickNameMessage={errors.nickName?.message}
        checkedConventions={checkedConventions}
        setCheckedConventions={setCheckedConventions}
      />
    </>
  );
}
