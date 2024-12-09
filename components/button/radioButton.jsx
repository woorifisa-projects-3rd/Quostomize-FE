"use client";

const RadioButton = ({index, isAccepted, setAccepted}) => {
  
    const handleConsentClick = () => {
      if (index === 0) {
        setAccepted((prev) => {
          const newAccepted = [...prev];
          if (isAccepted[index] === true) {
            for (let i=0; i<newAccepted.length; i++) {
              newAccepted[i] = false;
            }
            return newAccepted;
          } else {
            for (let i=0; i<newAccepted.length; i++) {
              newAccepted[i] = true;
            }
            return newAccepted;
          }
        })
        return;
      }

      setAccepted((prev) => {
        const newAccepted = [...prev];
        newAccepted[index] = !isAccepted[index];
        return newAccepted;
      })
    };

    return (
      <div className="w-8 h-11 ">
        <div className="w-full h-full">
          <div 
            onClick={handleConsentClick}
            className="h-full flex items-center cursor-pointer relative"
          >
            {/* 외부 원 */}
            <div className={`
              w-5 h-5 rounded-full border-2 
              ${isAccepted[index]
                ? 'border-blue-500' 
                : 'border-gray-300'}
              mr-2 flex items-center justify-center
            `}>
              {/* 내부 원 (선택시 표시) */}
              {isAccepted[index] && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default RadioButton;