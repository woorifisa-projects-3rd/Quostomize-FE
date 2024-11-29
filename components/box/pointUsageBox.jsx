import MyToggle from "../../components/button/toggleButton";

const PointUsageBox =({
    title, icon, isEnabled, onToggle, isLoading, backgroundClass,
}) => {
    return (
        <div
            className={`rounded-lg shadow-lg ${backgroundClass}
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                <div className="font-bold">{title}</div>
                <div><img src={icon} alt="{title} 아이콘" /></div>
                <MyToggle isEnabled={isEnabled} onToggle={onToggle} disabled={isLoading}/>
            </div>
        </div>
    );
};

export default PointUsageBox;