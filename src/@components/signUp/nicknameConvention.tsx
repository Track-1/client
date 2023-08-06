import { useForm } from "react-hook-form";
import ConventionCheckBox from "./conventionCheckBox";
import NickName from "./nickName";
import ProfilImageContainer from "./profileImageContainer";

export default function NicknameConvention() {
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
      <NickName methods={methods} />
      <ConventionCheckBox nickNameMessage={errors.nickName?.message} />
    </>
  );
}
