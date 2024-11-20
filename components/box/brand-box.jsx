'use client'

const BrandBox = ({ iconSrc, category, descriptions = [] }) => {  // color -> iconColor로 변경
    return (
        <div className="flex gap-4 mb-4">
            {/* 아이콘 영역 */}
            <div className="flex items-start">
                <img
                    src={iconSrc}
                    alt={`${category} icon`}
                    width="40"
                    height="40"
                />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                    <span className="text-gray-800">{category}</span>
                </div>
                <div>
                    {descriptions.map((desc, index) => (
                        <div key={index} className="text-gray-600 mb-1">{desc}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBox