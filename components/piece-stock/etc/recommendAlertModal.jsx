'use client'

const RecommendAlertModal = ({ title, description }) => {

    return (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#43505E] text-white px-8 py-4 rounded-lg shadow-lg flex items-center gap-4 max-w-lg w-[90%]">
            <span className="text-2xl">⚠️</span>
            <div>
                <div className="text-sm">{title}</div>
                <div className="text-sm mt-1">{description}</div>
            </div>
        </div>
    );
}

export default RecommendAlertModal;