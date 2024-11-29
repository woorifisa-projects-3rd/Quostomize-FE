import HomeHeader from "../../../components/piece-stock/home/header"
import HomeBody from "../../../components/piece-stock/home/body"
import { cookies } from "next/headers";

export async function cardIdInfo() {
  const cookieList = await cookies();
  try {
    const response = await fetch(`${process.env.NEXT_URL}/api/piece-stock/home`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Cookie: cookieList
      },
      credentials: "include",
    });
    return await response.json()
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const PieceStockHome = async () => {
  const data = await cardIdInfo();
  return (
    <>
      <HomeHeader data={data} />
      <HomeBody data={data} />
    </>
  );
};
export default PieceStockHome;