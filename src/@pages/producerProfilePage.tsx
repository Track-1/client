import { useParams } from "react-router-dom";
import Profile from "../@components/profile";
import useGetProducerProfile from "../hooks/producerProfile/useGetProducerProfile";

export default function ProducerProfilePage() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  return (
    <>
      <Profile
        userType={producerProfile?.userType}
        userSelf={producerProfile?.userSelf}
        userProfile={producerProfile?.userProfile}
      />
    </>
  );
}
