import { signIn } from "../../../auth"

const LoginPage = () => {
  const login = async(formData) => {
    'use server';
    await signIn("credentials", {
      memberLoginId: formData.get("memberLoginId"),
      memberPassword: formData.get("memberPassword"),
      redirect:true,
      redirectTo: "/home"
    });
  }
    return (
      <div>
        <form
          action={login}
        >
          <label>
            아이디
            <input name="memberLoginId" type="text"/>
          </label>

          <label>
            비밀번호
            <input name="memberPassword" type="password"/>
          </label>

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
  
  export default LoginPage;