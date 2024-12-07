import React from 'react'
import Header from "../../header/PageHeader";


function UserDetailHeader({ onClick }) {

    return (

        <div>
            <Header
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                신청인 정보
            </Header>
        </div>
    )
}

export default UserDetailHeader