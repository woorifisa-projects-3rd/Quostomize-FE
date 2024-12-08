'use client'

const LargeModal = ({ setIsOpen, onClose, title, description, choice, cancle, children }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-[#000000]/50 z-20"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-96 h-auto max-h-[90vh] bg-white border rounded-xl px-8 py-6 flex flex-col justify-center"
                onClick={(e) => e.stopPropagation()} // 클릭이 모달 바깥쪽으로 전달되지 않도록 함
            >
                <div className="font-bold text-lg flex justify-center">{title}</div>
                <div className="mt-2 text-sm">{description}</div>
                {children}
                <div className="flex flex-col gap-4 justify-center mt-4">
                    <button onClick={() => onClose()} className="w-2/3 py-3 m mx-auto bg-[#3081F7] text-[#FFFFFF] rounded-md">{choice}</button>
                    <button onClick={() => setIsOpen(false)} className="text-[#000000]">{cancle}</button>
                </div>
            </div>
        </div>
    );
}

export default LargeModal