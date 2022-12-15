import cloneDeep from "lodash/cloneDeep";
import { useEffect, useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavAvatar } from "../../components/Nav";
import { formatNoSpaces } from "../../utils/helpers";

export default function Login() {
  const { commentsValue } = useContext(CommentsContext);
  const [allData, setAllData] = commentsValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      console.log(
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

  // If user is already logged in and accesses /login, redirect to landing page
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [route, user]);

  return (
    <div className="mt-32 p-10 shadow-xl rounded-lg">
      <h2 className="text-3xl font-medium">Join Today</h2>
      <h3 className="py-4">Sign in with one of the providers</h3>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex gap-2 align-middle p-4 font-medium text-white bg-gray-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
function deepCopy(parsedData: any) {
  throw new Error("Function not implemented.");
}