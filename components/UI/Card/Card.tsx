type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps): JSX.Element {
  return (
    <div className="h-auto w-full max-w-[730px] mx-auto p-4 sm:p-6 bg-white dark:bg-darkModeCard text-grayishBlue dark:text-slate-400 shadow-sm rounded-lg">
      {children}
    </div>
  );
}
