import { redirect } from "next/dist/server/api-utils";

const MyPage = async () => {
  const response = await fetch(process.env.FRONT_URL+"/api/mypage")
  const result = await response.json();
  const data = result.data;
  // if (!memberInfo.data) {
  //   redirect('login')
  // }

  return (
    <div>
      <div>
        {data.memberName}
      </div>
      <div>
        {data.memberEmail}
      </div>
      <div>
        {data.zipCode}
      </div>
      <div>
        {data.memberAddress}
      </div>
      <div>
        {data.memberDetailAddress}
      </div>
    </div>
  );
}

export default MyPage;