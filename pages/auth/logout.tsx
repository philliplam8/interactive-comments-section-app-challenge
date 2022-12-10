import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Layout } from "../../components/Layout";

export default function Logout() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  useEffect(() => {
    // If user is not logged in, and accesses /logout, redirect to landing page
    if (!user) {
      route.push("/");
    } else {
      console.log("logout");
      signOut(auth)
        .then(() => {
          // Sign out successful
        })
        .catch((error) => {
          // An error happenned
          console.log(error);
        });
    }
  }, [route, user]);

  return <div>{loading ? "Signing out..." : <></>}</div>;
}
