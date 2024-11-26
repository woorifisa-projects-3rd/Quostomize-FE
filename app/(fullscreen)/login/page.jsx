'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react"
import LogoutButton from "../../../components/button/logoutButton";

const LoginPage = () => {
  const serachParams = useSearchParams();
  const router = useRouter();
  let redirectTo;
  const goalURL = serachParams.get("to");
  if (goalURL) {
    redirectTo = "/"+ goalURL;
  } else {
    redirectTo = "/home";
  }
  
  const login = async(formData) => {
    let isAuthed = true;
    try {
      const response = await signIn("credentials", {
        memberLoginId: formData.get("memberLoginId"),
        memberPassword: formData.get("memberPassword"),
        redirect: false,
      });
      if (response.error) {
        window.alert("아이디, 비밀번호 확인");
      }

    } catch (err) {
      isAuthed = false;
      window.alert(err.message);
    } finally {
      if (isAuthed) {
        router.push(redirectTo);
      }
    }
    

  }
    return (
      <div>
        <form
          action={login}
          className="flex flex-col"
        >
          <label>
            아이디
            <input name="memberLoginId" type="text" className="border-2 border-green-400"/>
          </label>

          <label>
            비밀번호
            <input name="memberPassword" type="password" className="border-2 border-green-400"/>
          </label>

          <button type="submit" className="border-4 border-solid bg-red-400">Sign In</button>
        </form>
        <LogoutButton />
      </div>
    );
  }
  
  export default LoginPage;
