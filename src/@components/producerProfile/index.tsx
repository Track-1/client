import { useParams } from "react-router-dom";
import useGetProducerProfile from "../../hooks/producerProfile/useGetProducerProfile";
import Profile from "../profile";

export default function ProducerProfile() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  return (
    <>
      <Profile userType="producer" userSelf={producerProfile?.userSelf} userProfile={producerProfile?.userProfile} />
    </>
  );
}
