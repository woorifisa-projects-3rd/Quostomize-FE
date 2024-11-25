"use client";

const BenefitBox = ({ icon, category, description }) => {
    return (
        <div className="flex items-center w-full max-w-md h-16 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-default">
            {/* 아이콘 영역 */}
            <div className="w-16 h-full flex items-center justify-center pl-6">
                <img
                    src={icon}
                    width="40"
                    height="40"
                    className="block mx-auto"
                />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1 pl-8">
                <p className="text-sm text-gray-500">
                    {description}
                </p>
                <div className="font-semibold text-lg" style={{ color: "#0083CA" }}>
                    {category}
                    <span className="text-[#333d4b] ml-2">혜택</span>
                </div>
            </div>
        </div>
    );
}

export default BenefitBox;