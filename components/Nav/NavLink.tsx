import Link from "next/link";

interface NavItem {
  link: string;
  label: string;
}

export default function NavLink(props: NavItem): JSX.Element {
  return (
    <Link
      href={props.link}
      className={
        "h-full flex items-center text-lg font-bold md:font-light md:text-sm border-b-4 border-white hover:border-moderateBlue hover:text-black"
      }
    >
      {props.label}
    </Link>
  );
}
