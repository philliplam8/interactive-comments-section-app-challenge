import { MouseEventHandler } from "react";
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon, CloseIcon } from "../Icons";
import { ReplyIcon } from "../Icons/Icons";

function ScoreButton(props: {
  children: React.ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="flex justify-center items-center h-full sm:h-24 w-full fill-lightGrayishBlue hover:fill-moderateBlue"
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
}

export function Plus(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <ScoreButton handleClick={props.handleClick}>
      <PlusIcon />
    </ScoreButton>
  );
}

export function Minus(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <ScoreButton handleClick={props.handleClick}>
      <MinusIcon />
    </ScoreButton>
  );
}

export function Reply(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="flex flex-row gap-2 items-center justify-center font-medium text-moderateBlue hover:text-lightGrayishBlue fill-moderateBlue hover:fill-lightGrayishBlue"
      onClick={props.handleClick}
    >
      <ReplyIcon />
      Reply
    </button>
  );
}

export function Edit(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  readOnly?: boolean;
}): JSX.Element {
  return (
    <button
      className={`flex flex-row gap-2 items-center justify-center font-medium  ${
        props.readOnly
          ? "fill-moderateBlue text-moderateBlue hover:text-lightGrayishBlue hover:fill-lightGrayishBlue"
          : "fill-lightGrayishBlue text-lightGrayishBlue hover:fill-lightGrayishBlue cursor-not-allowed"
      } `}
      disabled={!props.readOnly}
      onClick={props.handleClick}
    >
      <EditIcon />
      Edit
    </button>
  );
}

export function Delete(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="flex flex-row gap-2 items-center justify-center font-medium text-softRed hover:text-paleRed fill-softRed hover:fill-paleRed"
      onClick={props.handleClick}
    >
      <DeleteIcon />
      Delete
    </button>
  );
}

export function TextButton(props: {
  label: string;
  classStyle: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className={`min-w-[104px] px-5 py-3 font-medium text-white rounded-lg uppercase ${props.classStyle}`}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  );
}

export function PrimaryButton(props: {
  label: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={"bg-moderateBlue hover:bg-lightGrayishBlue"}
      handleClick={props.handleClick}
    />
  );
}

export function SecondaryButton(props: {
  label: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={"bg-grayishBlue hover:bg-darkBlue w-full"}
      handleClick={props.handleClick}
    />
  );
}

export function ErrorButton(props: {
  label: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={"bg-softRed hover:bg-paleRed w-full"}
      handleClick={props.handleClick}
    />
  );
}

export function SendButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return <PrimaryButton label={"Send"} handleClick={props.handleClick} />;
}

export function ReplyButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return <PrimaryButton label={"Reply"} handleClick={props.handleClick} />;
}

export function UpdateButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return <PrimaryButton label={"Update"} handleClick={props.handleClick} />;
}

export function CloseButton(props: {
  classStyle?: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button className="w-[16px]" onClick={props.handleClose}>
      <CloseIcon />
    </button>
  );
}
