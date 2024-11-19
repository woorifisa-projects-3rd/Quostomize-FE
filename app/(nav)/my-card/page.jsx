import Image from 'next/image';
import MyToggle from '../../../components/button/toggle'

const MyCardPage = () => {
  return (
    <div>
      {/* TODO: API 통신 및 s3 이미지 주소로 변경 필요 */}
      <div>
        <h3>페이백</h3>
        <MyToggle />
        <p>포인트의 80% 페이백 받기</p>
      </div>
    </div>
  );
}

export default MyCardPage;