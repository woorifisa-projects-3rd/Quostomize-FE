const WinnerCard = ({man}) => {
  return (
    <div className="shrink-0 relative w-5/6 h-[128px] bg-white rounded-lg shadow-lg flex items-center">
      
      <div className="absolute top-4 -left-4 w-1/5 aspect-square bg-orange-500/80 rounded-md shadow-[1px_6px_6px_0_rgb(254,138,24,0.4)]" ></div>

      {/* Card Content */}
      <div className="ml-24 z-10">
        <div className="text-3xl font-bold mt-2 tracking-[.5em]">{man.name}</div>
      </div>
    </div>
  );
};

export default WinnerCard;