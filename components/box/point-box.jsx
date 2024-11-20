"use client";

const PointBox = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <span className="material-icons" style={{ fontSize: "40px", color: "#007AFF" }}>
                {icon} {/* Material Icons 아이콘 이름 */}
            </span>
            <h2 className="mt-2 text-sm font-semibold">{title}</h2>
        </div>
    );
}


export default PointBox;