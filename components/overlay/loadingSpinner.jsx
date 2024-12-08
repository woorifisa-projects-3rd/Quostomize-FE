export const LoadingSpinner = ({ message = '로딩 중입니다...' }) => (
	<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col w-48 h-48 items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
					<p className="text-gray-600">{message}</p>
			</div>
	</div>
);

export default LoadingSpinner;
