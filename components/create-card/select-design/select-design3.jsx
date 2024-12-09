const SelectDesign3 = () => {
    return (
        <div className="text-center m-10">
            {/* <h1 className="font4 m-10 font-bold">우리 커스터마이징 카드</h1> */}

            <ul className="text-gray-700">
                <li className="">5가지 영역에서 <strong>최대 20%</strong> 포인트 적립</li>
                <li className="">카드 혜택은 <strong>30일마다</strong> 자유롭게 변경</li>
                <li className="">포인트 사용처는 <strong>언제든 변경</strong></li>
            </ul>

            {/* 하단 그라데이션 섹션 */}
            <div className="relative w-full px-6 py-12 -mb-10 bg-gradient-to-b from-white via-blue-50 to-blue-100">
                <div className="max-w-md mx-auto">
                    <h2 className="font3 font-bold text-gray-900 text-center leading-relaxed">
                        한 장으로 누리는<br />
                        내가 원하는 카드
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default SelectDesign3