import Nav from "../../components/NavigationBar/bottomNav.jsx";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function NavLayout({ children }) {
  Nav
  return (
    <>
      <div className="w-96 h-[calc(100%-4rem)] bg-white">
        {children}
      </div>
      <Nav/>
    </>
  );
}
