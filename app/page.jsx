import { redirect } from "next/navigation";

export default function Home() {
  redirect('home');

  return (
    <div className="w-96 h-full bg-white">
      
    </div>
  );
}
