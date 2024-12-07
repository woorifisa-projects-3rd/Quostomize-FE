import React from 'react'
import PageHeader from "../../header/PageHeader";


function CardDetailHeader({ onClick }) {
    console.log("onClick received:", onClick);

    return (

        <div>
            <PageHeader
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                카드 정보
            </PageHeader>
        </div>
    )
}

export default CardDetailHeader