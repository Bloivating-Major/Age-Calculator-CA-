import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { AiFillMoon } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";
import "../animation.css";

function Card() {
  const [isToggled, setIsToggled] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [years, setYears] = useState(null);
  const [months, setMonths] = useState(null);
  const [days, setDays] = useState(null);
  const [showAge, setShowAge] = useState(false);
  const [yearsAnimationDuration, setYearsAnimationDuration] = useState(0);
  const [monthsAnimationDuration, setMonthsAnimationDuration] = useState(0);
  const [daysAnimationDuration, setDaysAnimationDuration] = useState(0);
  const [error, setError] = useState("");
  var errorYear = year;

  useEffect(() => {
    setYearsAnimationDuration(years * 10);
    setMonthsAnimationDuration(months * 10);
    setDaysAnimationDuration(days * 10);
  }, [years, months, days]);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    errorYear = year;
  }, [year]);

  const calculateAge = () => {
    let error = "";
    let userInput = new Date(`${month}/${day}/${year}`);
    console.log(userInput);

    let errorYearV1 = parseInt(errorYear);

    let today = new Date();

    if (!day && !month && !year) {
      error = "allFieldsRequired";
      setError(error);
      return;
    } else if (!day && !month) {
      error = "dayAndMonthRequired";
      setError(error);
      return;
    } else if (!day && !year) {
      error = "dayAndYearRequired";
      setError(error);
      return;
    } else if (!month && !year) {
      error = "monthAndYearRequired";
      setError(error);
      return;
    } else if (!day) {
      error = "dayRequired";
      setError(error);
      return;
    } else if (!month) {
      error = "monthRequired";
      setError(error);
      return;
    } else if (!year) {
      error = "yearRequired";
      setError(error);
      return;
    }

    if (
      (day < 1 || day > 31) &&
      (month < 1 || month > 12) &&
      !/^\d{4}$/.test(year)
    ) {
      error = "allInvalid";
      setError(error);
      return;
    }

    if (
      (day < 1 || day > 31) &&
      (month < 1 || month > 12) &&
      errorYearV1 > today.getFullYear()
    ) {
      error = "InvalidV2";
      console.log("Hello there");
      setError(error);
      return;
    }

    if ((day < 1 || day > 31) && (month < 1 || month > 12)) {
      error = "invalidDayMonth";
      setError(error);
      return;
    }

    if ((day < 1 || day > 31) && errorYearV1 > today.getFullYear()) {
      error = "invalidDayYear";
      setError(error);
      return;
    }

    if ((day < 1 || day > 31) && !/^\d{4}$/.test(year)) {
      error = "Version3";
      setError(error);
      return;
    }

    if ((month < 1 || month > 12) && errorYearV1 > today.getFullYear()) {
      error = "invalidMonthYear";
      console.log(error);
      setError(error);
      return;
    }

    if ((month < 1 || month > 12) && !/^\d{4}$/.test(year)) {
      error = "Version4";
      console.log(error);
      setError(error);
      return;
    }

    // Input validation for day (1 to 31)
    if (day < 1 || day > 31) {
      error = "validDate";
      setError(error);
      return;
    }

    // Input validation for month (1 to 12)
    if (month < 1 || month > 12) {
      error = "validMonth";
      console.log(error);
      setError(error);
      return;
    }

    // Input validation for year (exactly 4 digits)
    if (!/^\d{4}$/.test(year)) {
      error = "validYear";
      setError(error);
      return;
    }

    // Check if the day is valid for the selected month
    if (day > 28) {
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        error = "valildDayInTheMonth";
        setError(error);
        return;
      }
    }

    if (userInput.getTime() > today.getTime()) {
      error = "validPastCondition";
      setError(error);
      return;
    }

    let birthDate = new Date(`${month}/${day}/${year}`);

    let d1 = birthDate.getDate();
    console.log("Log 3 " + d1);
    let m1 = birthDate.getMonth() + 1;
    console.log("Log 4 " + m1);
    let y1 = birthDate.getFullYear();
    console.log("Log 5 " + y1);

    let d2 = today.getDate();
    console.log("Log 6 " + d2);
    let m2 = today.getMonth() + 1;
    console.log("Log 7 " + m2);
    let y2 = today.getFullYear();
    console.log("Log 8 " + y2);

    let d3, m3, y3;

    y3 = y2 - y1;
    console.log("Log 9 " + y3);

    if (m2 >= m1) {
      m3 = m2 - m1;
    } else {
      y3--;
      m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
      d3 = d2 - d1;
    } else {
      m3--;
      d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
      y3--;
      m3 = 11;
    }
    console.log(y3, m3, d3);

    setYears(y3);
    setMonths(m3);
    setDays(d3);
    setShowAge(true);
    setError(error);
  };

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const handleInputDay = (e) => {
    setDay(e.target.value);
    setError("");
  };

  const handleInputMonth = (e) => {
    setMonth(e.target.value);
    setError("");
  };

  const handleInputYear = (e) => {
    setYear(e.target.value);
    setError("");
  };

  return (
    <div
      className={`w-full h-screen flex flex-col items-center gap-28 ${
        isToggled ? "bg-lightBg" : "bg-darkBg"
      }`}
    >
      {/* Toggle Button */}
      <div className={`flex self-end mt-10 mr-5   `}>
        <div
          className={`relative w-20 h-10 border-4 border-gray-400 rounded-full ${
            isToggled
              ? "day-mode-border day-mode"
              : "night-mode-border night-mode"
          }`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer  transition-transform ${
              isToggled
                ? "translate-x-0 bg-black"
                : "translate-x-10 bg-blue-600"
            }`}
            onClick={handleClick}
          >
            {isToggled ? (
              <BsSun color="white" fontSize={"24px"} />
            ) : (
              <AiFillMoon color="white" fontSize={"20px"} />
            )}
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className={` relative flex flex-col  w-[40%] shadow-darkShadow rounded-3xl rounded-br-[18%] h-[55%] ${
          isToggled ? "bg-white" : "bg-darkCardBg"
        }`}
      >
        <div className="h-[40%] flex pt-16 pl-10 gap-20 relative">
          <label
            htmlFor="ip1"
            className={`absolute left-10 top-10 poppins-semibold ${
              isToggled ? "text-inputTextColor" : "text-white"
            }
  
           
            ${
              isToggled && error && error.includes("allFieldsRequired")
                ? "text-red-500"
                : !isToggled && error && error.includes("allFieldsRequired")
                ? "text-yellow-300"
                : ""
            }
  ${
    isToggled && error && error.includes("dayRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("dayRequired")
      ? "text-yellow-300"
      : ""
  } 
  ${
    isToggled && error && error.includes("dayAndMonthRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("dayAndMonthRequired")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("dayAndYearRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("dayAndYearRequired")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("validDate")
      ? "text-red-500"
      : !isToggled && error && error.includes("validDate")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("allInvalid")
      ? "text-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "text-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("invalidDayMonth")
      ? "text-red-500"
      : !isToggled && error && error.includes("invalidDayMonth")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("invalidDayYear")
      ? "text-red-500"
      : !isToggled && error && error.includes("invalidDayYear")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("Version3")
      ? "text-red-500"
      : !isToggled && error && error.includes("Version3")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("valildDayInTheMonth")
      ? "text-red-500"
      : !isToggled && error && error.includes("valildDayInTheMonth")
      ? "text-yellow-300"
      : ""
  }
  `}
          >
            DAY
          </label>
          <input
            id="ip1"
            type="number"
            className={`w-32 pl-4 text-3xl border-4 rounded-md appearance-none h-14 poppins-bold focus:border-4 ${
              // Add conditional classes based on the isToggled and error states
              isToggled
                ? "bg-white border-borderColor focus:border-black text-inputTextColor  "
                : "bg-darkCardBg border-darkBgBorder focus:border-darkFocusBorder focus:outline-none text-white placeholder:text-white"
            }
    
    ${
      isToggled && error && error.includes("allFieldsRequired")
        ? "border-red-500"
        : !isToggled && error && error.includes("allFieldsRequired")
        ? "border-yellow-300"
        : ""
    }
            
             ${
               isToggled && error && error.includes("dayRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("dayRequired")
                 ? "border-yellow-300"
                 : ""
             }
             
             ${
               isToggled && error && error.includes("dayAndMonthRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("dayAndMonthRequired")
                 ? "border-yellow-300"
                 : ""
             }
  ${
    isToggled && error && error.includes("dayAndYearRequired")
      ? "border-red-500"
      : !isToggled && error && error.includes("dayAndYearRequired")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("validDate")
      ? "border-red-500"
      : !isToggled && error && error.includes("validDate")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("allInvalid")
      ? "border-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "border-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("invalidDayMonth")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidDayMonth")
      ? "border-yellow-300"
      : ""
  } 
  ${
    isToggled && error && error.includes("invalidDayYear")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidDayYear")
      ? "border-yellow-300"
      : ""
  } 
  ${
    isToggled && error && error.includes("Version3")
      ? "border-red-500"
      : !isToggled && error && error.includes("Version3")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("valildDayInTheMonth")
      ? "border-red-500"
      : !isToggled && error && error.includes("valildDayInTheMonth")
      ? "border-yellow-300"
      : ""
  } 
    `}
            placeholder="DD"
            onChange={handleInputDay}
          ></input>
          {/* Display "This field is required" message if error exists for this field */}
          {error && error.includes("allFieldsRequired") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("dayRequired") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("dayAndMonthRequired") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("dayAndYearRequired") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("validDate") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}{" "}
          {error && error.includes("allInvalid") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}{" "}
          {error && error.includes("InvalidV2") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}
          {error && error.includes("invalidDayMonth") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}
          {error && error.includes("invalidDayYear") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}{" "}
          {error && error.includes("Version3") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}
          {error && error.includes("valildDayInTheMonth") && (
            <div
              className={`absolute left-10 top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid date
            </div>
          )}
          <label
            htmlFor="ip2"
            className={` absolute left-[250px] top-10 poppins-semibold  ${
              isToggled ? "text-inputTextColor" : "text-white"
            }   
            ${
              isToggled && error && error.includes("allFieldsRequired")
                ? "text-red-500"
                : !isToggled && error && error.includes("allFieldsRequired")
                ? "text-yellow-300"
                : ""
            }
  ${
    isToggled && error && error.includes("monthRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("monthRequired")
      ? "text-yellow-300"
      : ""
  } 
  ${
    isToggled && error && error.includes("dayAndMonthRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("dayAndMonthRequired")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("monthAndYearRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("monthAndYearRequired")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("validMonth")
      ? "text-red-500"
      : !isToggled && error && error.includes("validMonth")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("allInvalid")
      ? "text-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "text-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "text-yellow-300"
      : ""
  }  ${
              isToggled && error && error.includes("invalidDayMonth")
                ? "text-red-500"
                : !isToggled && error && error.includes("invalidDayMonth")
                ? "text-yellow-300"
                : ""
            } ${
              isToggled && error && error.includes("invalidMonthYear")
                ? "text-red-500"
                : !isToggled && error && error.includes("invalidMonthYear")
                ? "text-yellow-300"
                : ""
            }  
  ${
    isToggled && error && error.includes("Version4")
      ? "text-red-500"
      : !isToggled && error && error.includes("Version4")
      ? "text-yellow-300"
      : ""
  }  
              `}
          >
            MONTH
          </label>
          <input
            id="ip2"
            type="number"
            className={` w-32 pl-4 text-3xl border-4 rounded-md appearance-none h-14 poppins-bold  focus:border-4    ${
              isToggled
                ? "bg-white border-borderColor focus:border-black text-inputTextColor"
                : "bg-darkCardBg border-darkBgBorder focus:border-darkFocusBorder focus:outline-none text-white placeholder:text-white"
            }
            

            ${
              isToggled && error && error.includes("allFieldsRequired")
                ? "border-red-500"
                : !isToggled && error && error.includes("allFieldsRequired")
                ? "border-yellow-300"
                : ""
            }
            
             ${
               isToggled && error && error.includes("monthRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("monthRequired")
                 ? "border-yellow-300"
                 : ""
             }
             
             ${
               isToggled && error && error.includes("dayAndMonthRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("dayAndMonthRequired")
                 ? "border-yellow-300"
                 : ""
             }
  ${
    isToggled && error && error.includes("monthAndYearRequired")
      ? "border-red-500"
      : !isToggled && error && error.includes("monthAndYearRequired")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("validMonth")
      ? "border-red-500"
      : !isToggled && error && error.includes("validMonth")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("allInvalid")
      ? "border-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "border-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("invalidDayMonth")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidDayMonth")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("invalidMonthYear")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidMonthYear")
      ? "border-yellow-300"
      : ""
  } 
  
  ${
    isToggled && error && error.includes("Version4")
      ? "border-red-500"
      : !isToggled && error && error.includes("Version4")
      ? "border-yellow-300"
      : ""
  } 
      `}
            placeholder="MM"
            onChange={handleInputMonth}
          ></input>
          {/* Display "This field is required" message if error exists for this field */}
          {error && error.includes("allFieldsRequired") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("monthRequired") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("dayAndMonthRequired") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("monthAndYearRequired") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("validMonth") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}{" "}
          {error && error.includes("allInvalid") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}
          {error && error.includes("InvalidV2") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}{" "}
          {error && error.includes("invalidDayMonth") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}
          {error && error.includes("invalidMonthYear") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}
          {error && error.includes("Version4") && (
            <div
              className={`absolute left-[250px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid month
            </div>
          )}
          <label
            htmlFor="ip3"
            className={` absolute left-[456px] top-10 poppins-semibold  ${
              isToggled ? "text-inputTextColor" : "text-white"
            } 

            
            ${
              isToggled && error && error.includes("allFieldsRequired")
                ? "text-red-500"
                : !isToggled && error && error.includes("allFieldsRequired")
                ? "text-yellow-300"
                : ""
            }
  ${
    isToggled && error && error.includes("yearRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("yearRequired")
      ? "text-yellow-300"
      : ""
  } 
  ${
    isToggled && error && error.includes("dayAndYearRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("dayAndYearRequired")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("monthAndYearRequired")
      ? "text-red-500"
      : !isToggled && error && error.includes("monthAndYearRequired")
      ? "text-yellow-300"
      : ""
  }
  
  
  //Valid year and Past Year
  ${
    isToggled && error && error.includes("validYear")
      ? "text-red-500"
      : !isToggled && error && error.includes("validYear")
      ? "text-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("validPastCondition")
      ? "text-red-500"
      : !isToggled && error && error.includes("validPastCondition")
      ? "text-yellow-300"
      : ""
  }
  
  
  
  
  ${
    isToggled && error && error.includes("allInvalid")
      ? "text-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "text-yellow-300"
      : ""
  }
  //Past All Invalid
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "text-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("invalidDayYear")
      ? "text-red-500"
      : !isToggled && error && error.includes("invalidDayYear")
      ? "text-yellow-300"
      : ""
  }
  
  //Invalid day + Past Year
  ${
    isToggled && error && error.includes("Version3")
      ? "text-red-500"
      : !isToggled && error && error.includes("Version3")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("invalidMonthYear")
      ? "text-red-500"
      : !isToggled && error && error.includes("invalidMonthYear")
      ? "text-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("Version4")
      ? "text-red-500"
      : !isToggled && error && error.includes("Version4")
      ? "text-yellow-300"
      : ""
  }
       `}
          >
            YEAR
          </label>
          <input
            id="ip3"
            type="number"
            className={` w-32 pl-4 text-3xl border-4 rounded-md appearance-none h-14 poppins-bold  focus:border-4    ${
              isToggled
                ? "bg-white border-borderColor focus:border-black text-inputTextColor"
                : "bg-darkCardBg border-darkBgBorder focus:border-darkFocusBorder focus:outline-none text-white placeholder:text-white"
            } 

            
            ${
              isToggled && error && error.includes("allFieldsRequired")
                ? "border-red-500"
                : !isToggled && error && error.includes("allFieldsRequired")
                ? "border-yellow-300"
                : ""
            }
            
             ${
               isToggled && error && error.includes("yearRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("yearRequired")
                 ? "border-yellow-300"
                 : ""
             }
             
             ${
               isToggled && error && error.includes("dayAndYearRequired")
                 ? "border-red-500"
                 : !isToggled && error && error.includes("dayAndYearRequired")
                 ? "border-yellow-300"
                 : ""
             }
  ${
    isToggled && error && error.includes("monthAndYearRequired")
      ? "border-red-500"
      : !isToggled && error && error.includes("monthAndYearRequired")
      ? "border-yellow-300"
      : ""
  }
  
  //Valid Only Year
  ${
    isToggled && error && error.includes("validYear")
      ? "border-red-500"
      : !isToggled && error && error.includes("validYear")
      ? "border-yellow-300"
      : ""
  }
  ${
    isToggled && error && error.includes("validPastCondition")
      ? "border-red-500"
      : !isToggled && error && error.includes("validPastCondition")
      ? "border-yellow-300"
      : ""
  }
  
  
  //All Validation
  ${
    isToggled && error && error.includes("allInvalid")
      ? "border-red-500"
      : !isToggled && error && error.includes("allInvalid")
      ? "border-yellow-300"
      : ""
  }
  
  ${
    isToggled && error && error.includes("InvalidV2")
      ? "border-red-500"
      : !isToggled && error && error.includes("InvalidV2")
      ? "border-yellow-300"
      : ""
  } 
  
  //Valid Day and Year
  ${
    isToggled && error && error.includes("invalidDayYear")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidDayYear")
      ? "border-yellow-300"
      : ""
  }    

  ${
    isToggled && error && error.includes("Version3")
      ? "border-red-500"
      : !isToggled && error && error.includes("Version3")
      ? "border-yellow-300"
      : ""
  } 
  
  //Valid Month and Year
  ${
    isToggled && error && error.includes("invalidMonthYear")
      ? "border-red-500"
      : !isToggled && error && error.includes("invalidMonthYear")
      ? "border-yellow-300"
      : ""
  } 

  ${
    isToggled && error && error.includes("Version4")
      ? "border-red-500"
      : !isToggled && error && error.includes("Version4")
      ? "border-yellow-300"
      : ""
  } 
   `}
            placeholder="YYYY"
            onChange={handleInputYear}
          ></input>
          {/* Display "This field is required" message if error exists for this field */}
          {error && error.includes("allFieldsRequired") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("yearRequired") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("dayAndYearRequired") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("monthAndYearRequired") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              This field is required
            </div>
          )}
          {error && error.includes("validYear") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid year
            </div>
          )}
          {error && error.includes("validPastCondition") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be in the past
            </div>
          )}
          {error && error.includes("allInvalid") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid year
            </div>
          )}
          {error && error.includes("InvalidV2") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be in the past
            </div>
          )}
          {error && error.includes("invalidDayYear") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be in the past
            </div>
          )}
          {error && error.includes("Version3") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid year
            </div>
          )}
          {error && error.includes("invalidMonthYear") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be in the past
            </div>
          )}
          {error && error.includes("Version4") && (
            <div
              className={`absolute left-[456px] top-[125px] poppins-semibold ${
                isToggled ? "text-red-500" : "text-yellow-500"
              }`}
            >
              Must be a valid year
            </div>
          )}
        </div>

        <div className="h-[60%] w-full flex flex-col  pl-10 justify-center ">
          {/* circle */}
          <div
            onClick={() => calculateAge()}
            className="absolute w-20 h-20 rounded-full top-[155px] right-[50px] bg-blueTheme flex items-center justify-center z-10"
          >
            <FaArrowDown className="text-4xl text-white" />
          </div>

          {/* line */}
          <div
            className={`absolute w-[620px] h-1   top-[200px]  ${
              isToggled ? "bg-borderColor" : "bg-darkFocusBorder"
            } `}
          ></div>

          {/* Display Age */}
          {showAge && (
            <>
              <div className="flex items-center gap-4">
                <h1
                  className={` text-[80px] poppins-extrabold-italic leading-none count-up ${
                    isToggled ? "text-blueTheme " : "text-darkFocusBorder"
                  }`}
                  style={{ animationDuration: `${yearsAnimationDuration}ms` }}
                >
                  {" "}
                  {years}{" "}
                </h1>
                <h2
                  className={` text-[70px] poppins-extrabold-italic leading-none ${
                    isToggled ? "text-black" : "text-darkage"
                  } `}
                >
                  years
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <h1
                  className={` text-[80px] poppins-extrabold-italic leading-none count-up ${
                    isToggled ? "text-blueTheme " : "text-darkFocusBorder"
                  }`}
                  style={{ animationDuration: `${monthsAnimationDuration}ms` }}
                >
                  {months}
                </h1>
                <h2
                  className={` text-[70px] poppins-extrabold-italic leading-none ${
                    isToggled ? "text-black" : "text-darkage"
                  } `}
                >
                  months
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <h1
                  className={` text-[80px] poppins-extrabold-italic leading-none count-up ${
                    isToggled ? "text-blueTheme " : "text-darkFocusBorder"
                  }`}
                  style={{ animationDuration: `${daysAnimationDuration}ms` }}
                >
                  {days}
                </h1>
                <h2
                  className={` text-[70px] poppins-extrabold-italic leading-none ${
                    isToggled ? "text-black" : "text-darkage"
                  } `}
                >
                  days
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
