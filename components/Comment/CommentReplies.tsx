import { Comment } from "./";

export default function CommentReplies(): JSX.Element {
  function Divider(): JSX.Element {
    return <div className="w-1 mx-8 border-r-2"></div>;
  }

  return (
    <div className="max-w-[730px] flex flex-row justify-center mx-auto">
      <Divider />
      <div className="flex flex-col gap-5">
        <Comment
          key={1}
          currentUser={true}
          content={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat possimus velit vero sint, corrupti quae ipsa dicta cum nobis, repellat soluta, culpa magnam esse eveniet quibusdam ab laborum aliquid enim!"
          }
          avatarPng={"./images/avatars/image-juliusomo.png"}
          avatarWebp={"./images/avatars/image-juliusomo.webp"}
          createdAt={"1 day ago"}
          score={0}
          username={"I am a test reply"}
        />
        <Comment
          key={2}
          currentUser={false}
          content={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat possimus velit vero sint, corrupti quae ipsa dicta cum nobis, repellat soluta, culpa magnam esse eveniet quibusdam ab laborum aliquid enim!"
          }
          avatarPng={"./images/avatars/image-juliusomo.png"}
          avatarWebp={"./images/avatars/image-juliusomo.webp"}
          createdAt={"1 day ago"}
          score={0}
          username={"I am a test reply"}
        />
        <Comment
          key={3}
          currentUser={true}
          content={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat possimus velit vero sint, corrupti quae ipsa dicta cum nobis, repellat soluta, culpa magnam esse eveniet quibusdam ab laborum aliquid enim!"
          }
          avatarPng={"./images/avatars/image-juliusomo.png"}
          avatarWebp={"./images/avatars/image-juliusomo.webp"}
          createdAt={"1 day ago"}
          score={0}
          username={"I am a test reply"}
        />
      </div>
    </div>
  );
}
