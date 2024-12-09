'use client'

const BrandBox = ({ icons = [], category, descriptions = [] }) => {
    return (
        <div className="flex flex-col gap-4 m-4">
            {/* 텍스트 영역 */}
            <div className="flex-1">
                <div className="gap-4 items-center mt-2 font2">
                    <span className="font-bold">{category}</span>
                </div>

                {/* 아이콘 영역 */}
                <div className="grid grid-cols-5 gap-4 mt-2 mb-2">
                    {icons.map((icon, index) => (
                        <img
                            key={index}
                            src={icon}
                            alt={`${category} icon ${index}`}
                            width="40"
                            height="40"
                            className="mx-auto"
                        />
                    ))}
                </div>

                {/* 설명 영역 */}
                <div className="pt-1 pb-1 font1">
                    {descriptions.map((desc, index) => (
                        <div key={index} className="text-[color4] mb-2">{desc}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBox;