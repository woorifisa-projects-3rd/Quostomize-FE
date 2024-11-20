import { ChevronLeft, ChevronRight } from 'lucide-react';

function ArrowButton({ direction, onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-gray-700  rounded-full focus:outline-none"
        >
            {direction === "prev" ? <ChevronLeft size={45} className='transistion-colors hover:text-gray-400' /> : <ChevronRight size={45} className='transistion-colors hover:text-gray-400' />}
        </button>
    );
};

export default ArrowButton;