'use client'

import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";

const AlertModal = ({ isOpen, setIsOpen, onClose, title, description }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => { setIsOpen(false) }}
    >
      <div className="fixed inset-0 flex w-screen h-full bg-black/15 items-center justify-center p-4">
        <DialogPanel className="w-80 h-48 space-y-2 border bg-white px-8 py-6">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description>{description}</Description>
          <div className="flex gap-4 justify-end pt-6">
            <button onClick={() => onClose()}>확인</button>
            <button onClick={() => setIsOpen(false)}>취소</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default AlertModal;