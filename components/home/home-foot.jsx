"use client";

import MyFullButton from '../button/full-button'
import FadeInSection from "../fade-in/fade-in-section";

const HomeFoot = () => {

    return (
        <FadeInSection>
            <div>
                <MyFullButton href='/create-card'>카드 만들기</MyFullButton>
            </div>
        </FadeInSection>

    );
}

export default HomeFoot;