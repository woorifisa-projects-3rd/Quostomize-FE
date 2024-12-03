import React from 'react'

const HomeHeader = ({ data }) => {

    const headDummyData = {
        price: data?.output2?.[0]?.evluAmtSmtlAmt,
        rate: data?.output2?.[0]?.resultRate
    };

    return (
        <>
            <div className="bg-lime-300 p-4 rounded-2xl m-6">
                <div className="text-center">
                    <h1 className="font1 font-bold mb-3">Portfolio</h1>
                    <p className="font4 font-bold mb-3">Total {formatNumber(headDummyData.price)}</p>
                    <p className={`font-bold ${headDummyData.rate > 0 ? `text-red` : `text-blue-500`}`}>{headDummyData.rate > 0 ? "+" + headDummyData.rate + "%" : headDummyData.rate + "%"}</p>
                </div>
            </div>
        </>
    )
}

function formatNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default HomeHeader