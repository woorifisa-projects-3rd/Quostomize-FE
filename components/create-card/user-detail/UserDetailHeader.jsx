import React from 'react'
import Header from "../../header/prev-name-exit";


function UserDetailHeader({ onClick }) {

    return (

        <div>
            <Header
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