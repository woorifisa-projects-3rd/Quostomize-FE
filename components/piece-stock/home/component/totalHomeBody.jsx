import { deleteStocks } from "../apiMethod/apiList"

// 드래그 시작
export function handleDragStart(e, index, setDragOverIndex) {
    setDragOverIndex(index);
    e.target.style.opacity = 0.5; // 드래그 중인 항목을 반투명하게 표시
};

// 드래그 끝
export function handleDragEnd(e) {
    e.target.style.opacity = ""; // 드래그 종료 후 원래대로 복원
};

// 드래그된 항목이 다른 항목 위에 올려졌을 때 (이벤트 전파 방지)
export function handleDragOver(e) {
    e.preventDefault(); // 기본 동작을 막아줘야 드롭을 허용
};

// 드롭할 때 순서를 변경하는 함수
export function handleDrop(e, dropIndex, wishInfo, dragOverIndex, setOrderInfo, setWishInfo, setDragOverIndex, cardId) {
    e.preventDefault();

    const updatedData = [...wishInfo]; // 전체조회
    const first = updatedData[dragOverIndex].priority; // 드래그 시작위치
    const second = updatedData[dropIndex].priority;  // 드래그 끝 위치

    if (first == 3 && second == 1) {
        // 인데스 교환
        updatedData[0].priority = 2; // 1번객체 2로 저장
        updatedData[1].priority = 3; // 2번객체를 3로 저장 
        updatedData[2].priority = 1; //  3번객체 1로저장 -> 결론 현재 저장 순위 2,3,1 순으로 되어있음

        const draggedItem = updatedData[dragOverIndex]; // --3번에 대한 객체

        updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 3번에 대한 객체 제거 => 1번과 2번만 남음 (2,3)
        updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가 -- 1번부터 0개를 삭제하고 삭제했던 3번객체를 넣는다. (1,2,3)

    } else if (first == 1 && second == 3) {
        // 인데스 교환
        updatedData[0].priority = 3; // 1번객체 3로 저장
        updatedData[1].priority = 1; // 2번객체를 1로 저장 
        updatedData[2].priority = 2; //  3번객체 2로저장 -> 결론 현재 저장 순위 3,1,2 순으로 되어있음

        const draggedItem = updatedData[dragOverIndex]; // --1번에 대한 객체

        updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 1번에 대한 객체 제거 => 1번과 2번만 남음 (1,2)
        updatedData.splice(dropIndex, 0, draggedItem); // (1,2,3)
    } else {
        // 인데스 교환
        updatedData[dragOverIndex].priority = second; //  2번객체 1로저장 
        updatedData[dropIndex].priority = first; // 1번객체 2로변경 

        const draggedItem = updatedData[dragOverIndex]; // 드래그한 항목 --2번에 대한 객체 

        updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 2번에 대한 객체 제거 => 1번과 3번만 남음 
        updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가  -- 1번부터 0개를 삭제하고 삭제했던 2번 객체를 넣는다 
    }

    // 이 부분은 백엔드에 보내줄 정보를 정리
    const requestOrder = {
        currentOrder: first,
        editOrder: second,
        cardId: cardId
    }

    // 전송
    setOrderInfo(requestOrder)
    setWishInfo(updatedData); // 상태 업데이트
    setDragOverIndex(null); // 드래그 중인 인덱스를 초기화
};

// 삭제시 기능
export function handleDeleteClick(index, param, setWishInfo, wishInfo, cardId) {
    const newData = [...wishInfo]
    if (newData.length === 3) {
        if (index === 0) {
            newData[1].priority = 1
            newData[2].priority = 2
            newData.splice(index, 1)
            param.append("order", index + 1)
        } else if (index === 1) {
            newData[2].priority = 2
            newData.splice(index, 1)
            param.append("order", index + 1)
        } else {
            newData.splice(index, 1)
            param.append("order", index + 1)
        }
    } else if (newData.length === 2) {
        if (index === 0) {
            newData[1].priority = 1
            newData.splice(index, 1)
            param.append("order", index + 1)
        } else {
            newData.splice(index, 1)
            param.append("order", index + 1)
        }
    } else {
        newData.splice(index, 1)
        param.append("order", index + 1)
    }
    setWishInfo(newData)
    param.append("cardId", cardId)
    deleteStocks(param)
}

// 클릭 했을 때, 각 인덱스에 해당하는 제거박스 선택유무를 수정한다. + 0은 안보여주기 1은 보여주기 를 의미
export function deleteCheckBox(index, hoveredIndex, setHoveredIndex) {
    const newData = [...hoveredIndex]
    index === 0 || index === 1 || index === 2
        ? newData?.[index]?.order === 0
            ? newData.splice(index, 1, { order: 1 })
            : newData.splice(index, 1, { order: 0 })
        : null;
    setHoveredIndex(newData)
}
