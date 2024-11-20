import { ChevronLeft, ChevronRight } from 'lucide-react';

function ArrowButton({ direction, onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-gray-700 rounded-full focus:outline-none"
        >
            {direction === "prev" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
    );
};

export default ArrowButton;