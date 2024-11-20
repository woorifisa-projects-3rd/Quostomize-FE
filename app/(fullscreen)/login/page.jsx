import { signIn, signOut } from "../../../auth"

const LoginPage = async () => {

  const login = async(formData) => {
    'use server';
    await signIn("credentials", {
      memberLoginId: formData.get("memberLoginId"),
      memberPassword: formData.get("memberPassword"),
      redirect:true,
      redirectTo: "/test"
    });


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
      </div>
    );
  }
  
  export default LoginPage;