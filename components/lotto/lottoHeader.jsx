'use client'

import { useRouter } from "next/navigation";
import PageHeader from "../header/PageHeader";

function LottoHeader() {
    const router = useRouter();

    return (
        <div>
            <PageHeader
                modaltitle="복권"
                showArrowButton={true}
                onArrowClick={() => router.back()}
                exitDirection="/home"
            >
                일일복권
            </PageHeader>
        </div>
    )
}

export default LottoHeader