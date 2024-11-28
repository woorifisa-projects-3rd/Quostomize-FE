import { ChevronLeft, ChevronRight } from 'lucide-react';

function ArrowButtonV2({ direction, onClick }) {

    const handlePrevClick = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.history.href = '/home';
        }
    };
    return (
        <button
            onClick={direction === "prev" ? handlePrevClick : onClick}
            className="text-gray-700  rounded-full focus:outline-none"
        >
            {direction === "prev" ? <ChevronLeft size={45} className='transistion-colors hover:text-gray-400' /> : <ChevronRight size={45} className='transistion-colors hover:text-gray-400' />}
        </button>
    );
};

export default ArrowButtonV2;