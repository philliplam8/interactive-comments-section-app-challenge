import { MouseEventHandler, useState } from "react";
import { isPropertySignature } from "typescript";

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
      <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
      </svg>
    </ScoreButton>
  );
}

export function Minus(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <ScoreButton handleClick={props.handleClick}>
      <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
      </svg>
    </ScoreButton>
  );
}

export function Reply(): JSX.Element {
  return (
    <button className="flex flex-row gap-2 items-center justify-center font-medium text-moderateBlue hover:text-lightGrayishBlue fill-moderateBlue hover:fill-lightGrayishBlue">
      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
      </svg>
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
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
      </svg>
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
      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
      </svg>
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

export function ErrorButton(props: { label: string }): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={"bg-softRed hover:bg-paleRed w-full"}
    />
  );
}
