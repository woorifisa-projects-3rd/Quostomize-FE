'use client'

import { useRouter } from "next/navigation";
import NavPageHeader from "../header/NavPageHeader";

function LottoHeader() {
    const router = useRouter();

    return (
        <div>
            <NavPageHeader
                modaltitle="복권"
                showArrowButton={true}
                onArrowClick={() => router.back()}
                exitDirection="/home"
            >
                일일복권
            </NavPageHeader>
        </div>
    )
}

export default LottoHeader