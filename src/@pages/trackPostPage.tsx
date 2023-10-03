import Player from "../@components/@common/player";
import TrackPost from "../@components/trackPost";
import { PlayerProvider } from "../context/playerContext";

export default function TrackPostPage() {
  return (
    <PlayerProvider>
      <TrackPost />
      <Player />
    </PlayerProvider>
  );
}
