'use client'

import { useRouter } from "next/navigation";
import Header from "../header/prev-name-exit";

function LottoHeader() {
    const router = useRouter();

    return (
        <div>
            <Header
                modaltitle="복권"
                showArrowButton={true}
                onArrowClick={() => router.back()}
                exitDirection="/home"
            >
                일일복권
            </Header>
        </div>
    )
}

export default LottoHeader