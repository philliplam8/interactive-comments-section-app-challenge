import { NavLink, NAV_LINKS } from ".";

export default function NavLinksDesktop(): JSX.Element {
  return (
    <div className="h-full hidden md:flex flex-row md:gap-8 lg:gap-10 items-center light:bg-white dark:bg-black">
      {NAV_LINKS.map((item) => {
        return <NavLink key={item.name} link={item.link} label={item.name} />;
      })}
    </div>
  );
}
