const Bubble = ({message, x, y}) => {
  return (
    <div className={`absolute h-8 px-2 rounded-lg bg-[#E3E4E8] shadow-lg z-20 ${x} ${y}`}>
      <div className = "h-8 leading-8 text-[#43505E] text-center align-middle z-30">{message}</div>
      <div className="absolute left-16 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-[#E3E4E8] z-20"></div>
    </div>
  );
}

export default Bubble;