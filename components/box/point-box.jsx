"use client";

const PointBox = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center py-10 px-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-default">
            <span className="material-icons" style={{ fontSize: "60px", color: "#0083CA" }}>
                {icon} {/* Material Icons 아이콘 이름 */}
            </span>
            <h2 className="mt-4 text-sm font-semibold text-gray-700">{title}</h2>
        </div>
    );
}


export default PointBox;