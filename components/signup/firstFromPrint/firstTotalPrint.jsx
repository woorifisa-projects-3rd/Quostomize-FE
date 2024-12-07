

export const firstTotalPrint = (signupInfo, index, changeInfos, isChecked, checkMemberId, emailError, nameError, passwordError, rePasswordError) => {
    const key = `${signupInfo?.placeholder}-${index}}`
    if (signupInfo?.placeholder === "아이디") {
        return (
            <div key={index} className='flex flex-col justify-center'>
                <span className='ml-6 mb-4 font-medium'>{signupInfo?.placeholder}</span>
                <div className='flex'>
                    <input
                        className={`w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 ${isChecked === true ? `outline outline-2 outline-blue-500` : `focus:outline-none`}`}
                        type={signupInfo?.type}
                        value={signupInfo?.value}
                        placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                        onChange={(e) => changeInfos(e.target.value, index)}
                        maxLength={15}
                        minLength={4}
                    />
                    <button type="button" className={`w-1/4 mb-4 p-4  ml-4 mr-6 rounded-xl font1 font-sans font-semibold ${isChecked === true ? `bg-blue-700 text-white ` : `text-slate-400 bg-slate-200 hover:bg-blue-700 hover:text-white`}`} onClick={() => checkMemberId()}>중복확인</button>
                </div>
                {!isChecked && (
                    <div className="flex justify-center text-red-500">
                        <p>아이디가 이미 존재하거나 유효하지 않습니다. 다시 입력해주세요</p>
                    </div>
                )}
            </div>
        )
    } else if (signupInfo?.placeholder === "비밀번호") {
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
                {passwordError && (
                    <div className="flex justify-center text-red-500 mt-2">
                        <p>비밀번호는 영대소문자 1자 이상, 숫자 및 특수기호 1자 이상, 총 8자 이상</p>
                    </div>
                )}
            </div>
        )
    } else if (signupInfo?.placeholder === "이메일") {
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
                {emailError && (
                    <div className="flex justify-center text-red-500 mt-2">
                        <p>이메일 형식이 올바르지 않거나 값이 없습니다. 다시 입력해주세요</p>
                    </div>
                )}
            </div>
        )
    } else if (signupInfo?.placeholder === "이름") {
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
                {nameError && (
                    <div className="flex justify-center text-red-500 mt-2">
                        <p>이름이 유효하지 않습니다. 다시 입력해주세요</p>
                    </div>
                )}
            </div>
        )
    } else if (signupInfo?.placeholder === "비밀번호 확인") {
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
                {rePasswordError && (
                    <div className="flex ml-10 text-red-500 mt-2">
                        <p>비밀번호가 같지 않습니다. 다시 입력해주세요</p>
                    </div>
                )}
            </div>
        )
    }
}
