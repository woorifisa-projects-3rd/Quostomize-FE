'use client'

import { useEffect, useState } from "react";
import AlertModal from "../../../components/overlay/alertModal";
import BottomDrawer from "../../../components/overlay/bottomDrawer";
import { redirect } from "next/navigation";
import { signOut } from "../../../auth";
import { useSession } from "next-auth/react";

const TestPage = () => {
  const {update} = useSession();
  
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);
  
  const [res, setRes] = useState(null);
  const [isMounted, setMounted] = useState(false);
  
  
  useEffect(() => {
    const onLoad = async () => {
      update();
      // next서버 도메인/route/js 파일 경로
      const result = await fetch("http://localhost:3000/api/test")
      const resultJson = await result.json();
      if (result.status >= 400) {
        redirect(resultJson.redirectUrl);
      }
      setRes(resultJson);
    }
    onLoad();
  },[])

  useEffect(() => {
    if (isMounted === false) {
      setMounted(true);
      return;
    }
    console.log(res);
  },[res])
  
  return (
    <div>
      <button onClick={()=>{setIsOpen(true)}}>Alert 테스트 버튼</button>
      <button onClick={()=>{setDrawer(true)}}>Drawer 테스트 버튼</button>
      <AlertModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => {setIsOpen(false)}} title={"title"} description={"desc"}/>
      <BottomDrawer isOpen={drawerOpen} setIsOpen={setDrawer} onClose={() => {setDrawer(false)}} title={"title"} description={"desc"}/>
    </div>
  );
}
  
  export default TestPage;