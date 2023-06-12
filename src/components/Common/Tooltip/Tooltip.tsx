export default function Tooltip(props: {
  message: string;
  children: React.ReactNode;
}) {
  const { message, children } = props;
  return (
    <div className="group relative flex w-full">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
