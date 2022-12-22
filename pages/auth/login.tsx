import cloneDeep from "lodash/cloneDeep";
import { useEffect, useContext, MouseEventHandler } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { formatNoSpaces } from "../../utils/helpers";
import { LayoutLogin } from "../../components/Layout";

export default function Login() {
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(
        result.user,
        result.user.displayName,
        result.user.photoURL,
        result.user.metadata
      );

      // TODO: abstract this into function addUser
      // Make deep copy of comments data context
      let newData = cloneDeep(allData);
      // Add new user entry along with their avatar photo URLs
      const displayName = result.user.displayName;
      const newUsername = formatNoSpaces(displayName);
      newData.users[newUsername] = {
        png: result.user.photoURL,
        webp: result.user.photoURL,
      };
      setAllData(newData);

      // Automatically redirect user to landing page after signing in
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Sign in with Twitter
  const twitterProvider = new TwitterAuthProvider();
  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      console.log(result);
      const displayName = result.user.displayName;
      const screenName = result._tokenResponse.screenName;
      console.log({ displayName, screenName });
    } catch (error) {
      console.log(error);
    }
  };

  // Sign in with GitHub
  let githubProvider = new GithubAuthProvider();
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log(result);
      const displayName = result.user.displayName;
      const screenName = result._tokenResponse.screenName;
      console.log({ displayName, screenName });
    } catch (error) {
      console.log(error);
    }
  };

  function ProviderButton(props: {
    children: React.ReactNode;
    handleClick: MouseEventHandler<HTMLButtonElement>;
  }): JSX.Element {
    return (
      <button
        onClick={props.handleClick}
        className="w-full flex flex-row items-center gap-2 align-middle p-4 font-medium text-darkBlue hover:text-moderateBlue bg-white hover:bg-veryLightGray rounded-lg border-2 border-lightGray"
        aria-label="Sign in with Google"
      >
        {props.children}
      </button>
    );
  }

  // If user is already logged in and accesses /login, redirect to landing page
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [route, user]);

  return (
    <LayoutLogin>
      <div className="mx-8 p-10 shadow-xl rounded-lg text-darkBlue bg-white">
        <h2 className="text-3xl font-medium">Sign In</h2>
        <h3 className="text-grayishBlue py-4">
          Use one of the following providers
        </h3>

        <div className="flex flex-col gap-2">
          <ProviderButton handleClick={handleGoogleLogin}>
            <FcGoogle />
            <p>Continue with Google</p>
          </ProviderButton>
          <ProviderButton handleClick={handleTwitterLogin}>
            <AiOutlineTwitter className="text-moderateBlue" />
            <p>Continue with Twitter</p>
          </ProviderButton>
          <ProviderButton handleClick={handleGithubLogin}>
            <AiFillGithub />
            <p>Continue with GitHub</p>
          </ProviderButton>
        </div>
      </div>
    </LayoutLogin>
  );
}
