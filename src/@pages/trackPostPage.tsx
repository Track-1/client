import AudioInfo from "../@components/trackPost/audioInfo";
import AudioTitle from "../@components/trackPost/audioTitle";
import Download from "../@components/trackPost/download";
import ProducerProfile from "../@components/trackPost/producerProfile";
import ShowMore from "../@components/trackPost/showMore";

export default function TrackPostPage() {
  return (
    <>
      <AudioTitle />
      <ProducerProfile />
      <Download />
      <ShowMore />
      <AudioInfo />
    </>
  );
}
