import React from 'react'
import Header from "../../header/prev-name-exit";


function CardDetailHeader({ onClick }) {
    console.log("onClick received:", onClick);

    return (

        <div>
            <Header
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                카드 정보
            </Header>
        </div>
    )
}

export default CardDetailHeader