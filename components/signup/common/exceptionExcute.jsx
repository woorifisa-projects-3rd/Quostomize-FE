import React from 'react'

export const validateRegionNumber = (updatedForm) => {
    const frontValue = updatedForm[0]?.value || '';
    const backValue = updatedForm[1]?.value || '';

    const fullValue = frontValue + backValue;
    const isValid = fullValue.length === 13 && /^\d+$/.test(fullValue);
    return isValid;
}

export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // 대문자 체크
    const hasLowerCase = /[a-z]/.test(password); // 소문자 체크
    const hasNumber = /\d/.test(password); // 숫자 체크
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 체크
    const isLongLength = password.length >= 8;

    // 비밀번호가 조건을 만족하는지 검사
    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongLength) {
        return true;
    } else if (password === "") {
        return true;
    } else {
        return false;
    }
}

export const validateRePassword = (firstForm) => {
    const newData = [...firstForm]
    const rePasswrodData = newData[4]?.value
    const passwordData = newData[3]?.value
    // 비밀번호값의 일치여부를 검사
    if (rePasswrodData == passwordData && passwordData !== "" && passwordData.length > 7) {
        return true;
    } else {
        return false;
    }
}

export const validateEmail = (email) => {
    const hasSpecialChar1 = /[@]/.test(email);
    const hasSpecialChar2 = /[.]/.test(email);

    // 이메일이 조건을 만족하는지 검사
    if (hasSpecialChar1 && hasSpecialChar2) {
        return true;
    } else if (email === "") {
        return true;
    } else {
        return false;
    }
}

export const validateId = (id) => {
    const hasNoSpecialChar = /^[a-zA-Z0-9]*$/.test(id);
    if (id.length < 4) {
        return false;
    } else if (hasNoSpecialChar) {
        return true;
    }
}

