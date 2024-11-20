"use client";

const BenefitBox = ({ icon, category, description }) => {
    return (
        <div className="flex items-center w-full max-w-md h-16 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-default">
            {/* 아이콘 영역 */}
            <div className="w-16 h-full flex items-center justify-center pl-6">
                <span className="material-icons" style={{ fontSize: "24px", color: "#0083CA" }}>
                    {icon} {/* Material Icons 아이콘 이름 */}
                </span>
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