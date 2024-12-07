import React from 'react'
import PageHeader from "../../header/PageHeader";


function UserDetailHeader({ onClick }) {

    return (

        <div>
            <PageHeader
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                신청인 정보
            </PageHeader>
        </div>
    )
}

export default UserDetailHeader