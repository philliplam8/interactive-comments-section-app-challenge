import { Layout } from "../components/Layout";
import { Comment } from "../components/Comment";
import { Modal } from "../components/Modal";

export default function Home() {
  return (
    <Layout>
      <div id="card-group" className="flex flex-col gap-4">
        <Comment />
        <Comment />
        <Modal />
      </div>
    </Layout>
  );
}
