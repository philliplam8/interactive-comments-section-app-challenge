export default function Backdrop(props: {
  show: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div className="h-screen w-screen px-4 absolute top-0 left-0 right-0 flex justify-center items-center bg-grayishBlue/70 z-30">
        {props.children}
      </div>
    </>
  );
}
