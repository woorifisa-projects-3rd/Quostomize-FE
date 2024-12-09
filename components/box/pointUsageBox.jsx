
const PointUsageBox = ({
    title, icon, isEnabled, onClick, isLoading
}) => {
    return (
        <div
            className={`rounded-lg shadow-lg
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !isLoading && onClick()}
            style={{
                backgroundColor: isEnabled ? '#3384f6' : '#f0f0f0 ',
                color: isEnabled ? 'white' : '#808080',
            }}
        >
            <div className="px-6 py-4 w-full h-42 flex items-center justify-between">
                <div className="font-bold w-30 mr-5">{title}</div>
                <div><img src={icon} alt="{title} 아이콘" className="w-16 h-16" /></div>
            </div>
        </div>
    );
};

export default PointUsageBox;