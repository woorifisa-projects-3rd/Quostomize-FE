import React from 'react'
import Header from "../../header/PageHeader";

function TermsAgreementHeader({ onClick }) {

    return (

        <div>
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