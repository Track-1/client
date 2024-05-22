import Layout from '../@components/@common/layout/layout';
import Player from '../@components/@common/player';
import TrackPost from '../@components/trackPost';
import { PlayerProvider } from '../context/playerContext';

export default function TrackPostPage() {
  return (
    <Layout>
      <PlayerProvider>
        <PlayerProvider scope="comments">
          <TrackPost />
          <Player />
        </PlayerProvider>
      </PlayerProvider>
    </Layout>
  );
}
