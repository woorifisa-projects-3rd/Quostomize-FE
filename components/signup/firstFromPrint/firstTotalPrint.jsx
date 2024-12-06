

export const firstTotalPrint = (signupInfo, index, changeInfos, isChecked, checkMemberId) => {
    const key = `${signupInfo?.placeholder}-${index}}`
    if (signupInfo?.placeholder === "아이디") {
        return (
            <div key={index} className='flex flex-col justify-center'>
                <span className='ml-6 mb-4 font-medium'>{signupInfo?.placeholder}</span>
                <div className='flex'>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo?.type}
                    value={signupInfo?.value}
                    placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                    onChange={(e) => changeInfos(e.target.value, index)}
                    maxLength={15}
                />
                <button type="button" className={`w-1/4 mb-4 p-4  ml-4 mr-6 rounded-xl font1 font-sans font-semibold ${isChecked === true ? `bg-blue-700 text-white `:`text-slate-400 bg-slate-200 hover:bg-blue-700 hover:text-white`}`} onClick={()=>checkMemberId()}>중복확인</button>
                </div>
            </div>
        )
    }  else if(signupInfo?.placeholder === "비밀번호"){
        return (
            <div key={index} className='flex flex-col justify-center'>
                <span className='ml-6 mb-4 font-medium'>{signupInfo?.placeholder}</span>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo.type}
                    value={signupInfo.value}
                    placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                    onChange={(e) => { changeInfos(e.target.value, index) }}
                />
            </div>
        )
    }  else {
        return (
            <div key={index} className='flex flex-col justify-center'>
                <span className='ml-6 mb-4 font-medium'>{signupInfo?.placeholder}</span>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo.type}
                    value={signupInfo.value}
                    placeholder={`${signupInfo?.placeholder}을 입력해주세요`}
                    onChange={(e) => { changeInfos(e.target.value, index) }}
                />
            </div>
        )
    }
}
