import Nav from "../../components/navigationbar/bottomNav.jsx";
import { MdHome } from "react-icons/md";
import { FaCreditCard, FaChartLine } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export const metadata = {
  title: "조각투자",
  description: "우리 커스터마이징 조각투자 페이지",
};

export default function NavLayout({ children }) {
  const menuItems = [
    {title: "홈", icon: <MdHome />, path: "/home"},
    {title: "나의카드", icon: <FaCreditCard />, path: "/my-card"},
    {title: "투자", icon: <FaChartLine />, path: "/piece-stock/home"},
    {title: "전체", icon: <GiHamburgerMenu />, path: ""},
  ]

  return (
    <>
      <div className="w-[36rem] h-[calc(100%-4rem)] bg-white overflow-hidden">
        {children}
      </div>
      <Nav menuItems={menuItems} />
    </>
  );
}
