import React from 'react';
import { useBenefitContext } from './BenefitContext';

const SelectBenefit3 = ({ labels, data }) => {
    const { selectedOptions } = useBenefitContext();

    return (
        <div className="w-full max-w-2xl p-6 border-2 border-gray-300 rounded-md">
            <h3 className="font-semibold mb-4">선택된 혜택</h3>
            <div className="grid grid-cols-5 gap-4">
                {labels.map((label, index) => (
                    <div key={index} className="text-center">
                        <div className="font-medium">{label}</div>
                        <div className="text-blue-600">{data[index]}</div>
                        {selectedOptions[index] && (
                            <div className="text-sm text-gray-600 mt-1">
                                {selectedOptions[index]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectBenefit3;
