'use client'

import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

import PageHeader from '../header/PageHeader';

const MyPageHeader = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 left-0 w-full z-20 h-20 px-4 bg-white">
      <PageHeader
        modaltitle="마이페이지"
        description={
          <>
            변경을 취소하시겠습니까?
            <br />
            (변경 사항이 저장 되지 않습니다.)
          </>
        }
        showArrowButton={false}
        onArrowClick={() => router.back()}
        exitDirection="/home"
      >
        마이페이지
      </PageHeader>
    </div>
  );
}

export default MyPageHeader;