import { redirect } from "next/navigation";

export default function Home() {
  redirect('home');

  return (
    <div className="w-[36rem] h-full bg-white">

    </div>
  );
}
