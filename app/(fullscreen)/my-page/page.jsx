'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from 'react-icons/io5';

import LogoutButton from "../../../components/button/logoutButton";
import MyPageHeader from "../../../components/my-page/myPageHeader";
import EmailForm from "../../../components/create-card/input-address/EmailForm";
import AddressForm from "../../../components/create-card/input-address/AddressForm";
import LoadingSpinner from "../../../components/overlay/loadingSpinner";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ForbiddenModal from "../../../components/overlay/forbiddenModal";

const MyPage = () => {
  const router = useRouter();

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
  const [touched, setTouched] = useState({});
  const [buttonActive, setButtonActive] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isMounting, setMounting] = useState(true)
  const [isAuth, setAuth] = useState(200);

  const getMyInfo = async() => {
    const response = await fetch(`/api/my-page`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        cache: "no-store"
      },
    );
  
    if (response.status === 401 ) {
      await signOut({redirect: false});
      setAuth(401);
      return;
    }

    if (response.status === 403 ) {
      await signOut({redirect: false});
      setAuth(403);
      return;
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
    setOriginalPhoneNumber(memberInfo.phoneNumber);
    setOriginalAddress((prev) => {
      return {
        ...prev,
        zipCode: memberInfo.zipCode,
        address: memberInfo.residentialAddress,
        detailAddress: memberInfo.memberDetail,
      }
    })
    setButtonActive(false);
    setMounting(false);
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
    setFormData((prevForm) => {
      const prevValue = prevForm[name];
      if (prevValue != value ) {
        setButtonActive(true);
        return {...prev, [name]: value}
      }}
    );
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

  const phoneNumberTransform = (phoneNumber) => {
    let transformed;
    if (phoneNumber.length >= 8) {
      transformed = phoneNumber.slice(0,3)+"-"+phoneNumber.slice(3,7)+"-"+phoneNumber.slice(7);
    } else if (phoneNumber.length >= 4) {
      transformed = phoneNumber.slice(0,3)+"-"+phoneNumber.slice(3,7);
    } else {
      transformed = phoneNumber
    }
    return transformed;
  }
  
  const submitUpdatePhoneNumber = async () => {
    if (errors.length >= 1) {
      return;
    }
    if (originalPhoneNumber !== formData.phoneNumber) {
      try {
        const response = await fetch("/api/my-page/updatePhone",
          {
            body: JSON.stringify({phoneNumber: formData.phoneNumber}),
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            cache: "no-store",
            credentials: "include",
          }
          
        );
        if (response.redirected) {
          router.push(`${response.url}`);
        }
        setOriginalPhoneNumber(formData.phoneNumber);
      } catch (err) {
        console.log(err);
      }
    }
  }



  const submitUpdateAddress = async () => {
    if (errors.length >= 1) {
      return;
    }


    let checkChange = false;

    if (formData.residentialAddress !== originalAddress.address) {
      checkChange= true;
    }

    if (formData.detailedResidentialAddress !== originalAddress.detailAddress) {
      checkChange = true;
    }

    if (formData.residentialPostalCode !== originalAddress.zipCode) {
      checkChange = true;
    }

    if (checkChange === false) {
      return;
    }

    try {
      const response = await fetch("/api/my-page/updateAddress",
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          cache: "no-store",
          credentials: "include",
          body: JSON.stringify(
            {
              zipCode: formData.residentialPostalCode,
              newAddress: formData.residentialAddress,
              newDetailAddress: formData.detailedResidentialAddress
            }
          ),
        }
      );
      if (response.redirected) {
        router.push(`${response.url}`);
      }
      
      setOriginalAddress((prev) => {
        return {
          ...prev,
          zipCode: formData.residentialPostalCode,
          address: formData.residentialAddress,
          detailAddress: formData.detailedResidentialAddress
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const submitUpdateEmail = async () => {
    if (errors.length >= 1) {
      return;
    }

    const formEmail = formData.emailId+"@"+formData.emailDomain;

    if (originalEmail !== formEmail) {

      try {
        const response = await fetch("/api/my-page/updateEmail",
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            cache: "no-store",
            credentials: "include",
            body: JSON.stringify({newEmail: formEmail}),
          }
          
        );
        if (response.redirected) {
          router.push(`${response.url}`);
        }
        setOriginalEmail(formEmail);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const submitChange = async () => {
    if (buttonActive) {
      setLoading(true);
      await Promise.all([
        submitUpdatePhoneNumber(),
        submitUpdateAddress(),
        submitUpdateEmail()
      ])
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyInfo();
  },[])

  if(isAuth === 401) {
    return <ForbiddenModal title="로그인 필요" description="잠시 후 로그인 페이지로 이동합니다." goal="login"/>
  }
  
  if (isAuth === 403) {
    return <ForbiddenModal title="권한이 없는 계정" description="잠시 후 홈 페이지로 이동합니다." goal="home"/>
  }

  return (
    <div className="relative overflow-visible">
      <MyPageHeader />
      <div className="relative bg-slate-300 pb-4 min-h-screen">
        <div className="h-[7.5rem] mx-4 bg-slate-200 px-8 py-8 rounded-b-xl ">
          <div className="text-3xl tracking-widest font-bold">
            {memberName}
          </div>
          <div className="flex justify-between">
            <div>{memberLoginId}</div>
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
        <div>
          <div className="mx-4 mt-8 px-4 py-6 rounded-xl bg-slate-100 flex flex-col gap-4 justify-around">
            <div className="relative">
              <label className="block text-base font-medium text-gray-700 mb-3">전화번호</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumberTransform(formData.phoneNumber)}
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
            <AddressForm type={"residential"} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleBlur={handleBlur} handleCheckSameAddress={handleCheckSameAddress} errors={errors} isApplicant={false}/>
            <EmailForm formData={formData} handleInputChange={handleInputChange} validateField={validateField} handleBlur={handleBlur} errors={errors}/>
            <div className="mt-4 w-full flex justify-end pr-4">
              <div 
                className={`${buttonActive?"bg-blue-500":"bg-blue-200"} w-20 h-10 leading-10 text-center px-1 rounded-xl text-white ${buttonActive?"hover:bg-blue-600 hover:font-bold":""} select-none ${buttonActive?"cursor-pointer":"cursor-not-allowed"}`}
                onClick={() => {submitChange()}}
              >
                적용하기
              </div>
            </div>
          </div>
        </div>
        {
          isLoading
          ? <LoadingSpinner message="변경 중입니다..."/>
          : <></>
        }
        { isMounting && <LoadingSpinner /> }
      </div>
    </div>
  );
}

export default MyPage;