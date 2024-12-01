import RandomProfile from "../../utils/getRandomProfile"
import getRandomHello from "../../utils/getRandomHello";

const WinnerCard = ({name}) => {
  const message = getRandomHello();
  return (
    <div className="shrink-0 relative w-5/6 h-14 bg-white rounded-lg shadow-lg flex items-center px-4">
      <RandomProfile />
      <div className="ml-6 z-10 text-xl tracking-wider w-32 truncate">{name}</div>
      <div className="ml-4 w-60 truncate">{message}</div>
    </div>
  );
};

export default WinnerCard;