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

  const addNewUser = (
    newUsername: string,
    png: string | null,
    webp: string | null
  ): void => {
    // Make deep copy of comments data context
    let newData = cloneDeep(allData);

    // TODO: if there is no photo, use default image
    newData.users[newUsername] = {
      png: png,
      webp: webp,
    };
    setAllData(newData);
  };

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);

      // Add new user entry along with their avatar photo URLs
      const displayName = result.user.displayName;
      const newUsername = formatNoSpaces(displayName);
      addNewUser(newUsername, result.user.photoURL, result.user.photoURL);

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

      // Add new user entry along with their avatar photo URLs
      const displayName = result.user.displayName;
      const newUsername = formatNoSpaces(displayName);
      // const screenName = result._tokenResponse.screenName;
      // console.log({ displayName, screenName });
      addNewUser(newUsername, result.user.photoURL, result.user.photoURL);
      // Automatically redirect user to landing page after signing in
      route.push("/");
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

      // Add new user entry along with their avatar photo URLs
      const displayName = result.user.displayName;
      const newUsername = formatNoSpaces(displayName);
      // const screenName = result._tokenResponse.screenName;
      // console.log({ displayName, screenName });
      addNewUser(newUsername, result.user.photoURL, result.user.photoURL);
      // Automatically redirect user to landing page after signing in
      route.push("/");
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
        className="w-full flex flex-row items-center gap-2 align-middle p-4 font-medium text-darkBlue dark:text-slate-400 hover:text-moderateBlue dark:hover:text-lightGrayishBlue bg-white dark:bg-darkModeCard hover:bg-veryLightGray dark:hover:bg-darkBlue rounded-lg border-2 border-lightGray dark:border-grayishBlue"
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
      <div className="mx-8 p-10 shadow-xl rounded-lg text-darkBlue dark:text-slate-400 bg-white dark:bg-darkModeCard">
        <h2 className="text-3xl font-medium dark:text-white">Sign In</h2>
        <h3 className="text-grayishBlue dark:text-slate-400 py-4">
          Use one of the following providers
        </h3>

        <div className="flex flex-col gap-2">
          <ProviderButton handleClick={handleGoogleLogin}>
            <FcGoogle />
            <p>Continue with Google</p>
          </ProviderButton>
          <ProviderButton handleClick={handleTwitterLogin}>
            <AiOutlineTwitter className="text-moderateBlue dark:text-darkModeModerateBlue" />
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
