'use client'

const LargeModal = ({ setIsOpen, onClose, title, description, choice, cancle, children }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-[#000000]/50 z-20"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-[90%] max-w-2xl h-auto max-h-[90%] bg-white border rounded-xl px-8 py-6 flex flex-col justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
                <div className="font-bold text-lg flex justify-center">{title}</div>
                <div className="mt-2 text-sm">{description}</div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

                <div className="flex flex-col gap-4 justify-center mt-4">
                    <button onClick={() => onClose()} className="w-2/3 py-3 mx-auto bg-[#3081F7] text-[#FFFFFF] rounded-md">
                        {choice}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="text-[#000000]">
                        {cancle}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LargeModal;