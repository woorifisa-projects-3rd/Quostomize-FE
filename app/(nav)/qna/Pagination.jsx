export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="mt-6 flex justify-center gap-2">
            {/* 이전 페이지 버튼 */}
            <button
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-4 py-1 rounded-xl bg-white border border-gray-300 
                        hover:bg-gray-100 disabled:opacity-50"
            >
                이전
            </button>
            
            {/* 페이지 번호 버튼들 */}
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 rounded-xl ${
                        currentPage === i 
                            ? 'bg-blue-300 text-white' 
                            : 'bg-white border border-gray-300 hover:bg-gray-100'
                    }`}
                >
                    {i + 1}
                </button>
            ))}
            
            {/* 다음 페이지 버튼 */}
            <button
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-1 rounded-xl bg-white border border-gray-300 
                        hover:bg-gray-100 disabled:opacity-50"
            >
                다음
            </button>
        </div>
    );
};