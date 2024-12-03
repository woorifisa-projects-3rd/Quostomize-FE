import React from 'react';

const SelectBenefit3 = ({ labels, data, lowerCategoryMap, resetContext, benefitState }) => {

    return (
        <div className="w-full max-w-2xl p-6 border-2 border-gray-300 rounded-md">

            <div className='flex justify-between items-center mb-5'>
                <h3 className="font-semibold">선택된 혜택</h3>

                <button
                    onClick={resetContext}
                    className="px-6 py-2 bg-red-200 text-white rounded-lg hover:bg-red-500"
                > 선택 초기화 </button>

            </div>


            <div className="grid grid-cols-5 gap-4">
                {labels.map((label, index) => (
                    <div key={index} className="text-center">
                        <div className="font-medium">{label}</div>
                        <div className="text-blue-600">{data[index]}</div>
                        {benefitState.selectedOptions[index] && (
                            <div className="text-sm text-gray-600 mt-1">
                                {lowerCategoryMap[benefitState.selectedOptions[index]] || "선택 없음"}
                            </div>
                        )
                        }
                    </div>
                ))}
            </div>
        </div>

    );

};

export default SelectBenefit3;
