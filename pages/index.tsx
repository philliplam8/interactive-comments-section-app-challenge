import { Layout } from "../components/Layout";
import { Comment } from "../components/Comment";
import { Modal } from "../components/Modal";
import { ReplyInput } from "../components/ReplyInput";

export default function Home() {
  return (
    <Layout>
      <div id="card-group" className="flex flex-col gap-4">
        <Comment self={true} />
        <Comment self={false} />
        <Modal />
        <ReplyInput />
      </div>
    </Layout>
  );
}
