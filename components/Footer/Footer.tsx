interface LinkProps {
  label: string;
  link: string;
}

function Link(props: LinkProps): JSX.Element {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="font-bold hover:text-moderateBlue hover:underline active:text-moderateBlue active:underline"
    >
      {props.label}
    </a>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="flex flex-row flex-wrap justify-center mx-7 py-5 text-xs">
      <p>
        Challenge by{" "}
        <Link
          label="Frontend Mentor"
          link="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9"
        />
        . Coded by{" "}
        <Link
          label="Phillip Lam"
          link="https://github.com/philliplam8/interactive-comments-section-app-challenge"
        />
        .
      </p>
    </footer>
  );
}
