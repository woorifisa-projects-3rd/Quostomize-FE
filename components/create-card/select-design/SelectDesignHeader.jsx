import React from 'react'
import PageHeader from "../../header/PageHeader";


function SelectDesign({ onClick }) {

    return (

        <div className='sticky top-0 left-0 right-0 w-full h-20 z-30 bg-[#F8FAFC]'>
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