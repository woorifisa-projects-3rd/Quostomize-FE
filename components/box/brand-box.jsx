'use client'

const BrandBox = ({ iconSrc, category, descriptions = [] }) => {  // color -> iconColor로 변경
    return (
        <div className="flex gap-4 mb-4 itmes-center">
            {/* 아이콘 영역 */}
            <div className="relative">
                <img
                    src={iconSrc}
                    alt={`${category} icon`}
                    width="40"
                    height="40"
                    className="block mx-auto"
                />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1">
                <div className="gap-2 items-center mt-2">
                    <span className="text-[1.1rem] font-bold">{category}</span>
                </div>
                <div className="pt-1 pb-1 font1">
                    {descriptions.map((desc, index) => (
                        <div key={index} className="text-[color4] mb-1">{desc}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBox