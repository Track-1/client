import Player from "../@components/@common/player";
import TrackPost, { CommentsPlayerProvider } from "../@components/trackPost";
import { PlayerProvider } from "../context/playerContext";

export default function TrackPostPage() {
  return (
    <PlayerProvider>
      <CommentsPlayerProvider>
        <TrackPost />
        <Player />
      </CommentsPlayerProvider>
    </PlayerProvider>
  );
}
