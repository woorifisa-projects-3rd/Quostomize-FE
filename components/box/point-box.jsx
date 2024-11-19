"use client";

const PointBox = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center bg-white transition-all duration-300 cursor-pointer">
            {/* 아이콘 영역 */}
            <div className="w-16 h-16 mb-4 p-3">
                <img
                    src={icon}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* 텍스트 영역 */}
            <span className="text-gray-800 font-medium text-center">
                {title}
            </span>
        </div>
    );
}

export default PointBox;