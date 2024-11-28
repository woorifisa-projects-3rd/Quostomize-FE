import React from 'react'
import Header from "../../header/prev-name-exit";


function CheckInformationHeader({ onClick }) {

    return (

        <div>
            <Header
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                수령인 정보 확인
            </Header>
        </div>
    )
}

export default CheckInformationHeader