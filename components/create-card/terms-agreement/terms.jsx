'use client'

import 'material-icons/iconfont/material-icons.css';

import NoticeToggleBox from '../../box/noitce-toggle-box';
import RadioButton from "../../button/radioButton";

import Terms1 from "../../terms/terms1"
import Terms2 from "../../terms/terms2"
import Terms3 from "../../terms/terms3"
import Terms4 from "../../terms/terms4"
import Terms5 from "../../terms/terms5"

const Terms = ({ isAccepted, setAccepted }) => {

  return (
    <div className="px-10">
      <div>
        <p className="text-xl">카드 신청을 위해</p>
        <p className="text-xl"><span className="text-3xl font-bold color1">약관에 동의</span>해주세요!</p>
      </div>
      <div className='flex h-11 mt-6'>
        <RadioButton index={0} isAccepted={isAccepted} setAccepted={setAccepted} />
        <div className='h-full flex justify-center items-center'>
          <p className='text-base'>약관 전체동의</p>
        </div>
      </div>
      <div className="w-full border-b border-black/20"></div>
      <div className="mt-6 mb-9 flex flex-col gap-6 items-center">
        <div className='flex h-auto'>
          <RadioButton index={1} isAccepted={isAccepted} setAccepted={setAccepted} />
          <NoticeToggleBox title={"(필수) 개인 회원 약관 동의"} content={<Terms1 />} />
        </div>
        <div className='flex h-auto'>
          <RadioButton index={2} isAccepted={isAccepted} setAccepted={setAccepted} />
          <NoticeToggleBox title={"(필수) 특정 금융거래 보고 및 이용에 관한 동의"} content={<Terms2 />} />
        </div>
        <div className='flex h-auto'>
          <RadioButton index={3} isAccepted={isAccepted} setAccepted={setAccepted} />
          <NoticeToggleBox title={"(필수) 개인(신용)정보 수집·이용·제공 동의"} content={<Terms3 />} />
        </div>
        <div className='flex h-auto'>
          <RadioButton index={4} isAccepted={isAccepted} setAccepted={setAccepted} />
          <NoticeToggleBox title={"(선택) 개인(신용)정보 제3자 제공 동의"} content={<Terms4 />} />
        </div>
        <div className='flex h-auto'>
          <RadioButton index={5} isAccepted={isAccepted} setAccepted={setAccepted} />
          <NoticeToggleBox title={"(선택) 광고성 정보 수신 동의"} content={<Terms5 />} />
        </div>
      </div>
    </div>
  )
}

export default Terms
