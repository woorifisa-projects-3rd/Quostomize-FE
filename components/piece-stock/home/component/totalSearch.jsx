import { recommendStocks, saveStocks } from "../../../../components/piece-stock/home/apiMethod/apiList"

//추천모달열기
export function openModal(setOpen, param, setRecommend, cardId,setIsNotCard) {
    setOpen(true)
    recommendStocks(param, setRecommend, cardId,setIsNotCard)
    
}
//추천모달닫기
export function closeModal(setOpen) {
    setOpen(false)
}
// 추천종목체크여부저장
export function checkButton(index, setClickButton) {
    setClickButton((prevState) => {
        const newData = [...prevState];
        newData[index] = !newData[index];
        return newData;
    });

}
// 종목 선택 완료 시 피드백
export function choiceStocks(wishInfo, isClickButton, setShowAlertModal, recommendStockInfo, totalData, paramSave, saveData, compareData, setWishInfo, setOpen, setPage) {
    if ((wishInfo.length + isClickButton.filter(item => item === true).length) > 3) {
        setShowAlertModal(true)
        setTimeout(() => {
            setShowAlertModal(false); // 1초 후에 모달 숨기기
        }, 2000); //
    } else {
        isClickButton.forEach((checkStock, i) => { // 선택된 주식을 저장하는 코드
            const testName = []
            let duplicated = []
            let check = false;
            if (checkStock === true) { // 만일 해당 추천주식이 체크 되어 있다면
                const stockName = recommendStockInfo[i] // 해당하는 인덱스의 위시주식과 비교해서
                wishInfo.forEach((whishStock, index) => { // 내 위시주식 정보에서
                    if (whishStock.stockName === stockName.stockName) { // 만일 위시주식 안에 추천주식명이 없다면 통과
                        duplicated.push(true) // 중복일떄 true를 넣는다.
                    } else {    //중복이 있다면 체크
                        duplicated.push(false) // 중복이 아닐떄 false를 넣는다.
                    }
                })
                check = true;
                testName.push(stockName)
                totalData.push(stockName)

            }

            if (duplicated.includes(true)) {
                // console.log("위시주식에 이미 해당 주식이 존재합니다.");
            } else {
                if (check === true) {
                    testName.forEach((recommendName) => {

                        paramSave.append("stockName", recommendName.stockName)
                        saveStocks(paramSave); // 저장하는 함수 호출 (주석 처리된 상태)
                        saveData.push(recommendName)
                        paramSave.delete("stockName")
                    })
                } else {
                    // console.log("다음 추천주식 인덱스로")
                }

            }
        })
        if (saveData.length > 0) {
            if (wishInfo.length === 1) {
                compareData = saveData.map((data, i) => {
                    return (
                        {
                            ...data,
                            priority: i + 2
                        }
                    )
                })
            } else if (wishInfo.length === 2) {
                compareData = saveData.map((data, i) => {
                    return (
                        {
                            ...data,
                            priority: 3
                        }
                    )
                })
            } else {
                compareData = saveData.map((data, i) => {
                    return (
                        {
                            ...data,
                            priority: i + 1
                        }
                    )
                })
            }
            const newData = [...wishInfo, ...compareData]
            setWishInfo(newData)
        }
        setOpen(false) // 모달을 닫는다
        setPage([false, true, false])
    }
}

// 중복 확인로직
export function check(wishInfo, setAlert, selectedStocks, setPage, param) {
    if ((wishInfo.length + selectedStocks.length) > 3) {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 1500);
    }
    else {
        selectedStocks.forEach((checkStockName, i) => { // 선택된 주식을 저장하는 코드
            const testName = []
            let duplicated = []
            let check = false;
            const sample = checkStockName
            wishInfo.forEach((whishStock, index) => { // 내 위시주식 정보에서
                if (whishStock.stockName === checkStockName) { // 만일 위시주식 안에 추천주식명이 없다면 통과
                    duplicated.push(true) // 중복일떄 true를 넣는다.
                } else {    //중복이 있다면 체크
                    duplicated.push(false) // 중복이 아닐떄 false를 넣는다.
                }
            })
            check = true;
            testName.push(sample)

            if (duplicated.includes(true)) {
                // console.log("위시주식에 이미 해당 주식이 존재합니다.");
            } else {
                if (check === true) {
                    testName.forEach((stockName) => {

                        param.append("stockName", stockName)
                        saveStocks(param); // 저장하는 함수 호출 (주석 처리된 상태)
                        param.delete("stockName")
                    })
                } else {
                    // console.log("다음 추천주식 인덱스로")
                }
                setPage([true, false, false])
            }
        })
    }
}