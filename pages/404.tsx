import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { MdOutlineWrongLocation } from "react-icons/md";
import { PrimaryButton } from "../components/UI/Buttons";

export default function Custom404() {
  const route = useRouter();
  const handleHomeButton = () => {
    route.push(`/`);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-10 justify-center text-center items-center text-grayishBlue dark:text-slate-400 ">
        <div className="flex flex-col gap-5 items-center">
          <MdOutlineWrongLocation className="h-10 w-10 text-softRed" />
          <div>
            <h1 className="text-2xl font-semibold ">
              Oops! Where in the world did we go...
            </h1>
            <div>
              <h2 className="text-sm font-light">
                Sorry we couldn't find what you were looking for.
              </h2>
            </div>
          </div>
        </div>
        <PrimaryButton label={"Let's Go Home"} handleClick={handleHomeButton} />
      </div>
    </Layout>
  );
}
