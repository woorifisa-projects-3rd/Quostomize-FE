export default function FullLayout({ children }) {
  return (
    <div className={`h-full overflow-scroll bg-slate-50 [&::-webkit-scrollbar]:hidden`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
      {children}
    </div>
  );
}
