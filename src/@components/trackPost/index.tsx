import AudioInfo from "./audioInfo";
import AudioTitle from "./audioTitle";
import Download from "./download";
import PlayButton from "./playButton";
import ProducerProfile from "./producerProfile";
import ShowMore from "./showMore";

export default function TrackPost() {
  return (
    <>
      <AudioTitle />
      <ProducerProfile />
      <Download />
      <PlayButton />
      <ShowMore />
      <AudioInfo />
    </>
  );
}
