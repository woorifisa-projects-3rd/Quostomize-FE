"use client";

const BenefitBox = ({ icon, category, description }) => {
    return (
        <div className="flex items-center w-full max-w-md h-16 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            {/* 아이콘 영역 */}
            <div className="w-16 h-full flex items-center justify-center">
                <img
                    src={icon}
                    alt={category}
                    className="w-8 h-8 object-contain"
                />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1 pl-2">
                <p className="text-sm text-gray-500">
                    {description}
                </p>
                <div className="text-blue-600 font-semibold text-lg">
                    {category}
                    <span className="text-gray-600 ml-2">혜택</span>
                </div>
            </div>
        </div>
    );
}

export default BenefitBox;