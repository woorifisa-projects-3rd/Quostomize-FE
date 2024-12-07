import React from 'react'
import PageHeader from "../../header/PageHeader";


function SelectDesign({ onClick }) {
    console.log("onClick received:", onClick);

    return (

        <div>
            <PageHeader
                modaltitle="카드 생성"
                showArrowButton={false}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                카드 디자인 선택
            </PageHeader>
        </div>
    )
}

export default SelectDesign