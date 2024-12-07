import React from 'react';
import RadioButton from '../button/radioButton';

const Terms4 = ({ setAccepted }) => {
  return (
    <>
      <section>
        <h2>개인정보를 제공받는 자</h2>
        <ul>
          <li>우리은행</li>
          <li>우리카드</li>
        </ul>
      </section>
      <br />
      <section>
        <h2>개인정보를 제공받는 자의 개인정보 이용목적</h2>
        <ul>
          <li>우리금융지주 빅데이터 기반 서비스에 활용 </li>
          <li>맞춤형 광고 서비스에 활용</li>
        </ul>
      </section>
      <br />
      <section>
        <h2>제공되는 개인정보 항목</h2>
        <div>
          <ul>
          <li>개인식별정보: 이름, 생년월일, 연락처, 주소, 이메일 등</li>
            <li>신용거래정보: 대출, 보증, 신용카드 이용 내역 등</li>
            <li>신용도 정보: 신용등급, 연체 기록 등</li>
            <li>공공기관 정보: 법원 판결 정보, 체납 정보 등</li>
          </ul>
        </div>
      </section>
      <br />
      <section>
        <h2>개인정보를 제공받는 자의개인정보 보유 및 이용기간</h2>
        <div>
          <ul>
            <li>2025.01 ~ 2028.01 (3년)</li>
          </ul>
        </div>
      </section>
      <RadioButton index={3} setAccepted={setAccepted} />
    </>
  );
};

export default Terms4;