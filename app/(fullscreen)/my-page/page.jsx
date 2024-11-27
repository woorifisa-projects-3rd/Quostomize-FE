'use-client'

import { redirect } from "next/navigation";

import LogoutButton from "../../../components/button/logoutButton";
import MyPageHeader from "../../../components/my-page/myPageHeader";
import EmailForm from "../../../components/create-card/input-address/EmailForm";
import AddressForm from "../../../components/create-card/input-address/AddressForm";

const MyPage = () => {
  const [memberName, setMemberName] = useState("")
  const [memberLoginId, setMemberLoginId] = useState("");
  const [formData, setFormData] = useState({
    residentialPostalCode: '',
    residentialAddress: '',
    detailedResidentialAddress: '',
    emailId: '',
    emailDomain: '',
    phoneNumber: '',
  });
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("");
  const [originalAddress, setOriginalAddress] = useState({});
  const [errors, setErrors] = useState({});

  const getMyInfo = async() => {
    const response = await fetch(`${process.env.NEXT_URL}/api/my-page`,
      {
        method: "GET",
        headers: {
            "Content-type": "application/json";
        },
        credentials: "include",
        cache: "force-cache"
      },
    );
  
    if (response.url.includes("/login")) {
      return redirect("/login?to=my-page")
    }
  
    const result = await response.json();
    const memberInfo = result.data;
    const fullEmail = memberInfo.memberEmail;
    const [memberEmailId, memberEmailDomain] = fullEmail.split("@");
    setMemberName(memberInfo.memberName);
    setMemberLoginId(memberInfo.memberLoginId);
    setFormData((prev) => {
      return {
        ...prev,
        residentialPostalCode: memberInfo.zipCode,
        residentialAddress: memberInfo.memberAddress,
        detailedResidentialAddress: memberInfo.memberDetailAddress,
        emailId: memberEmailId,
        emailDomain: memberEmailDomain,
        phoneNumber: memberInfo.memberPhoneNumber
      }
    })
    setOriginalEmail(memberInfo.memberEmail);
    setOriginalPhoneNumber(memberInfo.memberPhoneNumber);
    setOriginalAddress((prev) => {
      return {
        ...prev,
        zioCode: memberInfo.zipCode,
        address: memberInfo.memberAddress,
        detailAddress: memberInfo.memberDetailInfo,
      }
    })
  }

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    switch (field) {
        case 'emailId':
        case 'emailDomain':
            if (!formData.emailId || !formData.emailDomain) {
                newErrors.email = '이메일 주소를 모두 입력해주세요.';
            } else {
                delete newErrors.email;
            }
            break;
        case 'phoneNumber':
            if (!/^\d{11}$/.test(value)) {
                newErrors[field] = '휴대폰 번호를 입력해 주세요';
            } else {
                delete newErrors[field];
            }
            break;
        case 'confirmCardPassword':
            if (value !== formData.cardPassword) {
                newErrors[field] = '비밀번호가 일치하지 않습니다.';
            } else {
                delete newErrors[field];
            }
            break;
        default:
            if (!value.trim()) {
                newErrors[field] = '필수 항목을 입력해주세요.';
            } else {
                delete newErrors[field];
            }
            break;
    }
    setErrors(newErrors);
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, formData[field]);
  };

  const handleCheckSameAddress = (e) => {
      const isChecked = e.target.checked;
      setFormData((prev) => ({
          ...prev,
          isSameAsDeliveryAddress: isChecked,
          residentialPostalCode: isChecked ? prev.deliveryPostalCode : '',
          residentialAddress: isChecked ? prev.deliveryAddress : '',
          detailedResidentialAddress: isChecked ? prev.detailedDeliveryAddress : '',
      }));
  };

  return (
    <>
    <MyPageHeader />
    <div className="bg-slate-300">
        <div className="h-28 bg-blue-500 px-4 py-8">
          <div className="text-3xl">
            {memberInfo.memberName}
          </div>
          <div className="flex justify-between">
            <div>{memberInfo.memberLoginId}</div>
            <LogoutButton />
          </div>
        </div>
        <div>
          <div className="mx-4 mt-8 px-4 py-6 rounded-xl bg-slate-100 flex flex-col gap-4 justify-around">
          <div className="relative">
                <label className="block text-base font-medium text-gray-700 mb-3">전화번호</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 11) {
                            handleInputChange({ target: { name: 'phoneNumber', value } });
                            validateField('phoneNumber', value);
                        }
                    }}
                    className={`w-full p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
                        errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="'-'없이 입력해주세요"
                />
                {errors.phoneNumber && (
                    <div className="flex items-center mt-2 text-red-500">
                        <IoWarningOutline className="mr-2 text-lg" />
                        <p className="text-sm">{errors.phoneNumber}</p>
                    </div>
                )}
            </div>
            <AddressForm type={"home"} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleBlur={handleBlur} handleCheckSameAddress={handleCheckSameAddress} errors={errors}/>
            <EmailForm formData={formData} handleInputChange={handleInputChange} validateField={validateField} handleBlur={handleBlur} errors={errors}/>
            <div className="mt-6">적용하기 버튼</div>
          </div>
        </div>
        <div>비밀번호 변경 버튼</div>
      </div>
    </>
  );
}

export default MyPage;