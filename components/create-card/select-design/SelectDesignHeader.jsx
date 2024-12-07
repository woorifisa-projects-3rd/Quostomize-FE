import React from 'react'
import Header from "../../header/PageHeader";


function SelectDesign({ onClick }) {
    console.log("onClick received:", onClick);

    return (

        <div>
            <Header
                modaltitle="카드 생성"
                showArrowButton={false}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                카드 디자인 선택
            </Header>
        </div>
    )
}

export default SelectDesign