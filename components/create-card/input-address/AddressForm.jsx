'use client';

import React from 'react';
import AddressSearch from './AddressSearch';

const AddressForm = ({
                         type,
                         formData,
                         setFormData,
                         handleInputChange,
                         handleBlur,
                         errors,
                         isSameAsDeliveryAddress,
                         handleCheckSameAddress,
                     }) => {
    const isDelivery = type === 'delivery';

    const handleAddressComplete = (data) => {
        if (isDelivery) {
            setFormData(prev => ({
                ...prev,
                deliveryPostalCode: data.postalCode,
                deliveryAddress: data.address,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                isSameAsDeliveryAddress: false,
                residentialPostalCode: data.postalCode,
                residentialAddress: data.address,
                detailedResidentialAddress: '',
            }));
        }
    };

    return (
        <div className="relative">
            <label className="block text-base font-medium text-gray-700 mb-3">
                {isDelivery ? '배송 받을 주소' : '자택 주소'}
            </label>
            <div className="flex items-center space-x-4 mb-4">
                <input
                    type="text"
                    name={`${type}PostalCode`}
                    value={formData[`${type}PostalCode`]}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur(`${type}PostalCode`)}
                    disabled={!isDelivery && isSameAsDeliveryAddress}
                    className={`w-2/3 p-3 border-2 rounded-xl transition-all duration-300 outline-none
                        ${errors[`${type}PostalCode`] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'}`}
                    placeholder="우편번호"
                />
                <AddressSearch onComplete={handleAddressComplete} />
            </div>
            <input
                type="text"
                name={`${type}Address`}
                value={formData[`${type}Address`]}
                onChange={handleInputChange}
                onBlur={() => handleBlur(`${type}Address`)}
                disabled={!isDelivery && isSameAsDeliveryAddress}
                className={`w-full p-3 border-2 rounded-xl transition-all duration-300 outline-none mb-4
                    ${errors[`${type}Address`] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'}`}
                placeholder="도로명 주소"
            />
            <input
                type="text"
                name={`detailed${type.charAt(0).toUpperCase() + type.slice(1)}Address`}
                value={formData[`detailed${type.charAt(0).toUpperCase() + type.slice(1)}Address`]}
                onChange={handleInputChange}
                onBlur={() => handleBlur(`detailed${type.charAt(0).toUpperCase() + type.slice(1)}Address`)}
                disabled={!isDelivery && isSameAsDeliveryAddress}
                className={`w-full p-3 border-2 rounded-xl transition-all duration-300 outline-none
                    ${errors[`detailed${type.charAt(0).toUpperCase() + type.slice(1)}Address`] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'}`}
                placeholder="상세 주소"
            />
            {!isDelivery && (
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        checked={isSameAsDeliveryAddress}
                        onChange={handleCheckSameAddress}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                        배송 받을 주소와 동일
                    </span>
                </div>
            )}
        </div>
    );
};

export default AddressForm;