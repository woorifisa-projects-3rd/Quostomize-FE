'use client'

import NotFound from "../public/lotties/notFound.json";
import Lottie from "../components/lottie/lottieComponent";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Link href={"/home"} className="w-full h-full flex flex-col items-center justify-center bg-white cursor-pointer" >
      <Lottie animationData={NotFound} loop={true} />
      <p>존재하지 않는 페이지입니다.</p>
      <p>클릭시 홈페이지로 이동합니다.</p>
    </Link>
  );
}

export default Custom404;