
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "../../../components/button/logoutButton"
import MyPageHeader from "../../../components/my-page/myPageHeader"

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
    <>
    <MyPageHeader />
    <div className="bg-slate-300">
        <div className="h-28 bg-blue-500 px-4 py-8">
          <div className="text-3xl">
            {memberInfo.memberName}
          </div>
          <div className="flex justify-between">
            <div>{memberInfo.memberLoginId}</div>
            <LogoutButton />
          </div>
        </div>
        <div>
          <div className="mx-4 mt-8 px-4 py-6 rounded-xl bg-slate-100 flex flex-col gap-4 justify-around">
            <div>휴대전화</div>
            <div>주소</div>
            <div>이메일</div>
            <div className="mt-6">적용하기 버튼</div>
          </div>
        </div>
        <div>비밀번호 변경 버튼</div>
      </div>
    </>
  );
}

export default MyPage;