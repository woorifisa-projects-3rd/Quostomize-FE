'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InitialView from "./initialView";
import IsWinner from "./isWinner";
import IsLooser from "./isLoser";

const WinningModal = (isWinner) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(0);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (Cookies.get("winner_checked") == "false") {
      setIsOpen(true);
    }
  },[])
  
  const initialComponents = <InitialView />
  const winnerComponents = <IsWinner />
  const loserComponents = <IsLooser />

  const components = [initialComponents];
  if (isWinner) {
    components.push(winnerComponents);
  } else {
    components.push(loserComponents);
  }

  const setCookie = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59, 999
    );

    Cookies.set("winner_checked", "true",
      {
        expires: endOfDay.getTime()
      }
    );
  }


  const handleComponentTransition = () => {
    setCurrentComponent((prev) => {
        if (prev === 0) {
          return prev + 1;
        } else {
          setIsOpen(false);
          return 0;
        }
      }
    )
  };

  useEffect(() => {
    if (isMounted === false) {
      setMounted(true)
      return
    }
    
    if (!isOpen) {
      setCookie();
    }
  },[isOpen])
  
  return (
    <Dialog
      open={isOpen}
      onClose={() => { 
        setIsOpen(false);
     }}
    >
      <div className="fixed inset-0 flex w-screen h-full bg-black/15 items-center justify-center p-4 z-30">
        <DialogPanel className="w-96 h-96 space-y-2 border bg-white px-8 py-6 rounded-xl">
          <DialogTitle className="font-bold">오늘의 복권 결과 보기</DialogTitle>
          <div className="relative w-full h-full overflow-hidden">
            {components.map((component, index) => (
              <div
                key={index}
                className={`
                  absolute top-0 left-0 h-full transition-all duration-500 
                  ${index === currentComponent 
                    ? "w-full opacity-100" 
                    : "w-0 opacity-0"}
                `}
                onClick={index === currentComponent ? handleComponentTransition : undefined}
              >
                {component}
              </div>
            ))}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default WinningModal;