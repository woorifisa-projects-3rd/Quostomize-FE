export const validateLoginId = (loginId) => {
	if (!loginId) return '아이디를 입력해주세요.';
	if (loginId.length < 5 || loginId.length > 15) {
			return '아이디는 5자 이상, 15자 이하로 입력해주세요.';
	}
	return '';
};

export const validatePassword = (password) => {
	if (!password) return '비밀번호를 입력해주세요.';
	if (password.length < 8 || password.length > 16) {
			return '비밀번호는 8자 이상, 16자 이하로 입력해주세요.';
	}
	return '';
};