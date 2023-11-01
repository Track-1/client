import Player from "../@components/@common/player";
import ProducerProfile from "../@components/producerProfile";
import { PlayerProvider } from "../context/playerContext";

export default function ProducerProfilePage() {
  return (
    <PlayerProvider>
      <ProducerProfile />
      <Player />
    </PlayerProvider>
  );
}
