export default function Backdrop(props: { show: boolean }): JSX.Element {
  return (
    <>
      {props.show && (
        <div className="h-screen w-screen absolute top-0 left-0 bg-black/90 z-20"></div>
      )}
    </>
  );
}
