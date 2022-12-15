interface AvatarProps {
  pngSrc: string;
  webpSrc: string;
  large?: boolean;
}

export default function Avatar(props: AvatarProps): JSX.Element {
  const dimension: number = props.large ? 50 : 32;
  return (
    // Use webp for browsers that support it (Chrome, Firefox, Edge)
    // Fall back on png for browsers that don't support (Safari, IE)
    <picture>
      <source srcSet={props.webpSrc} type={"image/webp"} />
      <img
        src={props.pngSrc}
        alt={`User avatar image`}
        height={dimension}
        width={dimension}
        className={"rounded-full"}
        referrerPolicy={"no-referrer"}
      />
    </picture>
  );
}
