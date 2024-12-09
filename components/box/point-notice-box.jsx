"use client";

const PointBox = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center py-5 px-4 bg-gray-100 rounded-lg cursor-default">
            <img
                src={icon}
                width="40"
                height="40"
                className="block mx-auto"
            />
            <h2 className="mt-4 text-sm font-semibold text-[#333d4b]">{title}</h2>
        </div>
    );
}


export default PointBox;