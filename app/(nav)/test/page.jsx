'use client'

import { useEffect, useState } from "react";
import AlertModal from "../../../components/overlay/alertModal";
import BottomDrawer from "../../../components/overlay/bottomDrawer";

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);
  
  const [res, setRes] = useState(null);
  

  useEffect(() => {
    const onLoad = async () => {
      // next서버 도메인/route/js 파일 경로
      const result = await fetch("http://localhost:3000/api/test")
      const resultJson = await result.json();
      setRes(resultJson);
    }
    onLoad();
  },[])

  useEffect(() => {
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