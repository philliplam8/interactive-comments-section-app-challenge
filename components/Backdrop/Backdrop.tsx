export default function Backdrop(props: {
  show: any;
  closeModal: any;
}): JSX.Element {
  return (
    <>
      <div
        className="h-screen w-screen absolute top-0 left-0 bg-black/90 z-20"
        onClick={props.closeModal}
      ></div>
    </>
  );
}
