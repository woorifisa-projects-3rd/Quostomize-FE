import { GET } from "../../api/piece-stock/home/route";
import HomeHeader from "../../../components/piece-stock/home/header"
import HomeBody from "../../../components/piece-stock/home/body"


const PieceStockHome = async () => {

  const response = await GET(); // 여기에 API 엔드포인트를 호출(증권계좌에 연결된 주식 종목)
  const data = await response.json() // NextResponse 타입 데이터 추출 진행

  return (
    <>
      <HomeHeader data={data} />
      <HomeBody data={data} />
    </>
  )
}

export default PieceStockHome;