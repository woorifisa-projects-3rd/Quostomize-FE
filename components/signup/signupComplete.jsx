import { useRouter } from 'next/navigation'

const SignupComplete = () => {
    const router = useRouter();

    const toHome = () => {
        router.push("/home")
    }
    return (
        <>
            <h1 className="font-bold font5 p-3">회원가입 완료</h1>
            <h2 className="font-semibold font3 p-3 mb-16 text-slate-400">회원가입이 완료 되었습니다.</h2>

            <div className='flex justify-center'>
                <button className="bg-black rounded-3xl w-5/6 h-20 font3 font-sans text-white font-semibold mt-8" onClick={toHome}>홈으로</button>
            </div>

        </>
    )
}

export default SignupComplete