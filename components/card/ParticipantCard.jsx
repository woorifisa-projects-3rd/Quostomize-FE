import SlotCounter from 'react-slot-counter';

const ParticipantCard = ({men}) => {
  return (
    <div className="mt-8 shrink-0 relative w-5/6 h-[100px] bg-white rounded-lg shadow-lg items-center">

      {/* Card Content */}
      <div className="mt-6 ml-10 z-10">
        <div className="text-base font-bold">00월 00일 현재,</div>
        <div className="text-2xl font-bold mt-1">참여한 인원은 <SlotCounter startValue={"0000000"} value={men} containerClassName='text-3xl'/> 명이에요</div>
      </div>
    </div>
  );
};

export default ParticipantCard;