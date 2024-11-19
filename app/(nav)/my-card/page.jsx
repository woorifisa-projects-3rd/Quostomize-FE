import Image from 'next/image';
import MyToggle from '../../../components/button/toggle'

const MyCardPage = () => {
  return (
    <div>
      {/* TODO: API 통신 및 s3 이미지 주소로 변경 필요 */}
      <div>
        <h3>조각투자</h3>
        <MyToggle />
        <Image src='' alter='조각투자 이미지' width={50} height={50}></Image>
      </div>
    </div>
  );
}

export default MyCardPage;