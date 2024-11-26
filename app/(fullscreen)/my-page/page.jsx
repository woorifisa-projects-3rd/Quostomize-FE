
import { cookies } from "next/headers";
import LogoutButton from "../../../components/button/logoutButton"
import { redirect } from "next/navigation";

const MyPage = async () => {
  const cookieList = await cookies(); 
  const response = await fetch(`${process.env.NEXT_URL}/api/my-page`,
    {
      method: "GET",
      headers: {
          Cookie: cookieList
      },
      credentials: "include",
      cache: "force-cache"
    },
  );
  console.log(response);

  if (response.url.includes("/login")) {
    return redirect("/login?to=my-page")
  }
  console.log()

  const result = await response.json();
  const memberInfo = result.data;

  return (
    <div>
      <div>
        <div className="px-4 text-3xl">
          {memberInfo.memberName}
        </div>
        <div className="flex justify-between px-4">
          <div>{memberInfo.memberLoginId}</div>
          <LogoutButton />
        </div>
      </div>
      <div>
        <div>휴대전화</div>
        <div>주소</div>
        <div>이메일</div>
        
      </div>
      <div>적용하기 버튼</div>
      <div>비밀번호 변경 버튼</div>
    </div>
  );
}

export default MyPage;