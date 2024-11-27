// AddressSearch.js
'use client';

import React, {useEffect} from 'react';

const AddressSearch = ({ onComplete }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSearch = () => {
        new daum.Postcode({
            oncomplete: (data) => {
                onComplete({
                    postalCode: data.zonecode,
                    address: data.roadAddress
                });
            }
        }).open();
    };

    return (
        <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold
            hover:bg-blue-600 shadow-md hover:shadow-lg
            transition-all duration-200 flex items-center space-x-2"
        >
            <span>검색</span>
        </button>
    );
};

export default AddressSearch;