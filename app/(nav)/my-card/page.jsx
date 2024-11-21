'use client'

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyCardPage = () => {

  // const [cardData, setCardSequenceId] = useState(null);
  // const router = useRouter();

  // const fetchCardData = async (cardSequenceId) => {
  //   try {
  //     const result = await fetch(`/v1/api/my-card/{cardSequenceId}`);
  //     if (result.ok) {
  //       const data = await result.json();
  //       setCardSequenceId(data.data);
  //     } else {
  //       const errorData = await result.json();
  //       router.push(`/${errorData.redirectUrl}`);
  //     }
  //   } catch (error) {
  //     console.error('Error - 카드 혜택 불러오기: ', error);
  //   }
  // };

  // // fetchCardData: useEffect에서 실행 시키기
  // useEffect(() => {
  //   // cardSequenceId: 사용해서 작성하면 됨

  // })

  return (
    <div>
      <h1>나의 카드</h1>
      <div>카드 이미지
        {/* TODO: src - s3 이미지 주소로 변경 필요 */}
        <Image src="/images/temp-card.png" alt="내 카드 이미지" width={180} height={180}></Image>
      </div>

      <div>혜택 및 포인트
        {/* TODO: API 통신 후 개발 예정 */}
        <div>내 혜택 확인하기</div>
        <div>내 포인트 쓰는 곳</div>
      </div>
    </div>
  );
}

export default MyCardPage;