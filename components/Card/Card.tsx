type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps): JSX.Element {
  return (
    <div className="h-auto w-full max-w-[730px] mx-auto p-4 bg-white shadow-sm rounded-lg">
      {children}
    </div>
  );
}
