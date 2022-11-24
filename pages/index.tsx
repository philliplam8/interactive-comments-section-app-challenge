import { Layout } from "../components/Layout";
import { Comment } from "../components/Comment";
import { Modal } from "../components/Modal";
import { ReplyInput } from "../components/ReplyInput";
import { Backdrop } from "../components/Backdrop";

export default function Home() {
  return (
    <>
      <Layout>
        <div id="card-group" className="flex flex-col gap-5">
          <Comment self={true} />
          <Comment self={false} />
          <ReplyInput />
        </div>
      </Layout>
      <Modal />
    </>
  );
}
