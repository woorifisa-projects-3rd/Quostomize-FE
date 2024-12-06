import Image from 'next/image';
import Icons from '../../public/icons/icons'

const ErrorModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-4">
                    <Image
                        src={Icons.anxious}
                        alt="Error"
                        width={40}
                        height={40}
                    />
                    <h3 className="text-xl font-semibold ml-2">로그인 실패</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    아이디 또는 비밀번호가 일치하지 않습니다.
                </p>
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-red-300 text-white rounded-xl font-semibold
                    hover:bg-red-400 transition-colors duration-200"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
