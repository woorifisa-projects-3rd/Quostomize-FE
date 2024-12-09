import React from 'react'
import Header from "../../header/PageHeader";

function TermsAgreementHeader({ onClick }) {

    return (

        <div className='sticky top-0 left-0 right-0 w-full h-20 z-30 bg-[#F8FAFC]'>
            <Header
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                약관 동의
            </Header>
        </div>
    )
}
export default TermsAgreementHeader