const getRandomHello = () => {
    const randomIndex = Math.floor(Math.random()*(7-0))+0;
    const helloList = [
        "오랜만에 운이 좋네요",
        "하... 포인트 별로 필요 없는데... 차라리 캐쉬백으로 할 걸 그랬네요...",
        "이게 되네?",
        "이거 완전 럭키비키자나~",
        "사실 1/1000 정도면 다 한번 씩 당첨될 수 있죠.",
        "야호!",
        "이걸로 내일 저녁엔 김까지 먹을 수 있겠네요."
    ];

    return helloList[randomIndex];
}

export default getRandomHello;