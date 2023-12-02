import Player from "../@components/@common/player";
import VocalProfile from "../@components/vocalProfile";
import { PlayerProvider } from "../context/playerContext";

export default function VocalProfilePage() {
  return (
    <PlayerProvider>
      <VocalProfile />
      <Player />
    </PlayerProvider>
  );
}
