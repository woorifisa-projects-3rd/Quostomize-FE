'use client'

import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();
  return (
    <div onClick={() => {router.back()}}>
      존재하지 않는 페이지입니다.
    </div>
  );
}

export default Custom404;