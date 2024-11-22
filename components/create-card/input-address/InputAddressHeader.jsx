import React from 'react'
import Header from "../../header/prev-name-exit";


function InputAddressHeader({ onClick }) {

    return (

        <div>
            <Header
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                카드 수령지 정보
            </Header>
        </div>
    )
}

export default InputAddressHeader