import { validatePassword, validateEmail, validateName, validateRegionNumber } from "../common/exceptionExcute"

export const changeInfoOnlyNumberByRegin = (value, index, form, setForm, setRegidenceNumberError) => {

    // 숫자만 입력 가능하도록 처리
    if (!/^\d*$/.test(value)) {
        value = '';
        return;
    } else {
        // 주민등록번호 검증

        const newData = [...form]
        const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
        newData.splice(index, 1, addData)



        if (!validateRegionNumber(newData)) {
            setRegidenceNumberError(true)
        } else {
            setRegidenceNumberError(false)
        }


        setForm(newData)
    }
}

export const changeInfoOnlyNumber = (value, index, form, setForm) => {

    // 숫자만 입력 가능하도록 처리
    if (!/^\d*$/.test(value)) {
        value = '';
        return;
    } else {
        const newData = [...form]
        const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
        newData.splice(index, 1, addData)

        setForm(newData)
    }
}

export const changeInfo = (value, index, form, setForm, setEmailError, setNameError, setPasswordError) => {
    // 모든 값을 저장입력 받는 함수
    const newData = [...form]
    const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
    newData.splice(index, 1, addData)

    // 비밀번호 필드인 경우에만 검증
    if (newData[index].placeholder === "비밀번호") {
        if (!validatePassword(value)) {
            setPasswordError(true); // 조건 불만족 시 오류 상태 업데이트
        } else {
            setPasswordError(false); // 조건 만족 시 오류 상태 해제
        }
    }

    // 이메일 필드인 경우에만 검증
    if (newData[index].placeholder === "이메일") {
        if (!validateEmail(value)) {
            setEmailError(true); // 조건 불만족 시 오류 상태 업데이트
        } else {
            setEmailError(false); // 조건 만족 시 오류 상태 해제
        }
    }

    // 이름 필드인 경우에만 검증
    if (newData[index].placeholder === "이름") {
        if (!validateName(value)) {
            setNameError(true); // 조건 불만족 시 오류 상태 업데이트
        } else {
            setNameError(false); // 조건 만족 시 오류 상태 해제
        }
    }

    setForm(newData)
}

//인증번호 페이지에 이용할 입력함수
export const handleInput = (value, index, form, setForm, formRefs) => {
    // const value = e.target.value;

    // 숫자만 입력 가능하도록 처리
    if (!/^\d*$/.test(value)) {
        value = '';
        return;
    }
    const newData = [...form]
    newData.splice(index, 1, value)
    setForm(newData)

    if (value.length === 1 && index < 5) {
        formRefs[index + 1].current?.focus();
    }
}