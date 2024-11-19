import Image from 'next/image';
import MyToggle from '../../../components/button/toggle'

const MyCardPage = () => {
  return (
    <div>
      {/* TODO: API 통신 및 s3 이미지 주소로 변경 필요 */}
      <h1>나의 카드</h1>
      <div>카드 이미지
        <Image src="/images/temp-card.png" alt="내 카드 이미지" width={180} height={180}></Image>
      </div>

      <div>혜택 및 포인트
        <div>내 혜택 확인하기</div>
        <div>내 포인트 쓰는 곳</div>
      </div>

      <div>
        <h3>조각투자</h3>
        <MyToggle />
        <Image src='' alter='조각투자 이미지' width={50} height={50}></Image>
      </div>

      <div>
        <h3>일일복권</h3>
        <MyToggle />
        <Image src='' alter='일일복권 이미지' width={50} height={50}></Image>
      </div>

      <div>
        <h3>페이백</h3>
        <MyToggle />
        <p>포인트의 80% 페이백 받기</p>
      </div>
    </div>
  );
}

export default MyCardPage;