'use client'

import { useRouter } from "next/navigation";
import PageHeader from "../header/PageHeader";

function LottoHeader() {
    const router = useRouter();

    return (
        <div className="sticky top-0 left-0 right-0 w-full h-20 z-20 bg-white">
            <PageHeader
                modaltitle="일일복권"
                showArrowButton={false}
                onArrowClick={() => router.back()}
                exitDirection="/home"
            >
                일일복권
            </PageHeader>
        </div>
    )
}

export default LottoHeader