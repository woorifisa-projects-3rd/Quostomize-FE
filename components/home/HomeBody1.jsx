"use client";

import React from "react";
import FadeInSection from "../fade-in/fade-in-section";
import GradientText from "../../components/card/gradientText";

const HomeBody1 = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-60 ">
            <FadeInSection>
                <div className="font4 text-center font-semibold"
                    style={{
                        letterSpacing: '0.1em'
                    }}>
                    <h1>
                        오직 나만을 위한
                        <span className="color1"> 우리금융그룹</span>
                    </h1>
                    <h1>
                        <GradientText
                            text=" '커스터마이징' "
                            style={{ backgroundImage: 'linear-gradient(-45deg, #c0c0c0, #99bbff, #d4d4d4, #99bbff)' }}

                        />서비스 출시
                    </h1>
                    <p className="font15 color3 mt-3">첫번째 시작, <span>{"{"}</span> 우리카드: 커스터마이징 카드 <span>{"}"}</span> </p>
                </div>
            </FadeInSection>
        </div>
    );
};

export default HomeBody1;
