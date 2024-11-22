import React from 'react';

const SelectBenefit3 = ({ labels, data }) => {
    // data가 없을 경우 빈 배열로 초기화
    const safeData = Array.isArray(data) ? data : [];

    return (
        <div className='flex justify-center items-center mt-5'>
            {/* 데이터가 있을 경우 박스 형태로 출력 */}
            <div className="p-6 border-2 border-gray-300 rounded-md">
                <h3 className="font-semibold mb-2">내가 선택한 적립 혜택:</h3>
                <div className="space-y-2">
                    {safeData.length > 0 ? (
                        safeData.map((item, index) => (
                            item <= 4 && (
                                <div key={index} className="flex items-center">
                                    <span className="font-medium">{labels[index]}: </span>
                                    <span className="ml-2 text-blue-600">{item}</span>
                                </div>
                            )
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectBenefit3;
