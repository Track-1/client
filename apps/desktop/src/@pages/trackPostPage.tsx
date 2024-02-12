import Layout from '../@components/@common/Layout';
import TrackPost, { CommentsPlayerProvider } from '../@components/trackPost';

export default function TrackPostPage() {
  return (
    <Layout>
      <CommentsPlayerProvider>
        <TrackPost />
      </CommentsPlayerProvider>
    </Layout>
  );
}
