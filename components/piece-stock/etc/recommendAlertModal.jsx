'use client'

const RecommendAlertModal = ({ title, description }) => {

    return (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#43505E] text-[#FFFFFF] px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <span className="text-[#FFFFFF]">⚠️</span>
            <div>
                <span>{title}</span>
                <span>{description}</span>
            </div>
        </div>
    );
}

export default RecommendAlertModal;