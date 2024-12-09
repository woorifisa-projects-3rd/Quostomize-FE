export default function FullLayout({ children }) {
  return (
    <div className={`h-full w-full overflow-y-auto bg-slate-50 [&::-webkit-scrollbar]:hidden relative`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
      {children}
    </div>
  );
}
