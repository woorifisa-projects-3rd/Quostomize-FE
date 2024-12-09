'use client'

import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";

const AlertModal = ({ isOpen, setIsOpen, onClose, title, description = "이 페이지에서 나가시겠습니까?" }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => { setIsOpen(false) }}
    >
      <div className="fixed inset-0 flex w-screen h-full bg-black/15 items-center justify-center p-2 z-50">
        <DialogPanel className="flex flex-col justify-between w-80 h-48 space-y-2 border bg-white px-8 py-6 rounded-lg shadow-lg">
          <DialogTitle className="font2 font-bold">{title}</DialogTitle>
          <Description className="text-gray-500">{description}</Description>
          <div className="flex gap-4 justify-end pt-2">
            <button className="bg-gray-300 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors" onClick={() => onClose()}>확인</button>
            <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setIsOpen(false)}>취소</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default AlertModal;