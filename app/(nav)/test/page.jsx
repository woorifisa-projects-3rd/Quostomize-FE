'use client'

import { useEffect, useState } from "react";
import AlertModal from "../../../components/overlay/alertModal";
import BottomDrawer from "../../../components/overlay/bottomDrawer";
import { useRouter } from "next/navigation";

const TestPage = () => {
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);
  
  const [res, setRes] = useState(null);
  
  
  // Initial data fetch
  useEffect(() => {

    const fetchData = async () => {
      try {
        // Update session before making the request
        const result = await fetch(
          "/api/test"
          , {
            cache: "no-store"
          }
        );

        const resultJson = await result.json();
        
        if (result.status >= 400) {
          router.push(`/${resultJson.redirectUrl}`);

          return;
        }
        
        setRes(resultJson);
      } catch (error) {
        console.error("Error fetching data");
      } 
    };

    fetchData();
  }, []); // Empty dependency array for initial load only

  
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