import { Layout } from "../components/Layout";
import { Comment } from "../components/Comment";
import { Modal } from "../components/Modal";
import { ReplyInput } from "../components/ReplyInput";

export default function Home() {
  return (
    <>
      <Layout>
        <div id="card-group" className="flex flex-col gap-5">
          <Comment currentUser={true} content={""} avatarPng={""} avatarWebp={""} username={""} createdAt={""} />
          <Comment currentUser={false} content={""} avatarPng={""} avatarWebp={""} username={""} createdAt={""} />

          {/* User's own new comment */}
          <ReplyInput />
        </div>
      </Layout>
      <Modal />
    </>
  );
}
