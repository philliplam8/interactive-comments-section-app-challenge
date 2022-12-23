import { useCommentsData } from "../hooks/useCommentsData";
import cloneDeep from "lodash/cloneDeep";
import { useState, useContext, useEffect } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import { Card } from "../components/UI/Card";
import { Avatar } from "../components/Avatar";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

export default function Settings(): JSX.Element {
  // Context State
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const [currentUser, setCurrentUser] = useState("");

  // React Query
  const { isLoading, error, data } = useCommentsData();

  const handleRowClick = (newCurrentUser: string) => {
    setCurrentUser(newCurrentUser);

    // Make deep copy of comments data context
    let newData = cloneDeep(allData);

    // Update demo user
    newData.demoUser = newCurrentUser;
    setAllData(newData);
  };

  function DemoUserRow(props: {
    name: string;
    png: string;
    webp: string;
  }): JSX.Element {
    const isCurrentUser: boolean = currentUser === props.name;

    return (
      <button
        className={`flex flex-row items-center gap-4 w-full p-4 border-2 rounded-xl ${
          isCurrentUser ? "border-moderateBlue" : " hover:bg-veryLightGray"
        }`}
        onClick={() => handleRowClick(props.name)}
      >
        <Avatar pngSrc={props.png} webpSrc={props.webp} large={true} />
        <p
          className={
            isCurrentUser ? "text-moderateBlue font-medium" : "text-grayishBlue"
          }
        >
          {props.name}
        </p>
        {isCurrentUser && (
          <BsFillPatchCheckFill className="text-moderateBlue" />
        )}
      </button>
    );
  }

  useEffect(() => {
    setCurrentUser(allData.demoUser);
  }, [allData]);

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-screen h-full w-full flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-moderateBlue" />
      </div>
    );
  }
  const parsedData = JSON.parse(data.toString());

  return (
    <Layout>
      <Card>
        <div className="py-4 md:w-[628px] text-grayishBlue">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-darkBlue text-2xl font-medium">Settings</h1>
            <MdSupervisorAccount className="h-7 w-7 text-grayishBlue" />
          </div>
          <div className="pt-2">
            Switch the default demo user or{" "}
            <Link
              href={"/auth/login"}
              className="text-moderateBlue font-medium hover:underline"
            >
              sign in with a live user
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2">
          {Object.keys(parsedData.users).map((user) => {
            const { png, webp } = parsedData.users[user];
            return <DemoUserRow key={user} name={user} png={png} webp={webp} />;
          })}
        </div>
      </Card>
    </Layout>
  );
}
