/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import NotiBell from "../assets/notifications.png";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import RegistrationNotiIcon from "../assets/RegistrationNotiIcon.png";
import ClaimNotiIcon from "../assets/ClaimNotiIcon.png";
import PaymentNotiIcon from "../assets/PaymentNotiIcon.png";
import ContractNotiIcon from "../assets/ContractNotiIcon.png";
import PlanNotiIcon from "../assets/PlanNotiIcon.png";
import InformationNotiIcon from "../assets/InformationNotiIcon.png";
import UpNotiIcon from "../assets/UploadSuccess.png";
import PwNotiIcon from "../assets/PasswordReset.png";

import useNotification from "../hooks/useNotifications";
import { useState } from "react";
const Notification = () => {
  const user1 = useSelector((state) => state.auth.login.currentUser);
  const scrollRef = useRef(null);

  let {
    notiArr,
    unreadCount,
    fetchLoading,
    markAsReadLoading,
    isToggleOpen,
    markAsRead,
    handleNotiBellClick,
    handleSeeMore,
  } = useNotification(user1, scrollRef);

  const NotiIcon = [
    { notiType: "Registration", Icon: RegistrationNotiIcon },
    { notiType: "Claim", Icon: ClaimNotiIcon },
    { notiType: "Payment", Icon: PaymentNotiIcon },
    { notiType: "Contract", Icon: ContractNotiIcon },
    { notiType: "Plan", notiIcon: PlanNotiIcon },
    { notiType: "Personal Information", notiIcon: InformationNotiIcon },
    { notiType: null, notiIcon: UpNotiIcon },
  ];
 
  return (
    <body className="block relative text-black">
      {!isToggleOpen ? (
        unreadCount != 0 ? (
          <div
            className={`absolute ml-[15px] h-[20px] w-[20px] bg-rose-500 rounded-full  text-xs flex items-center justify-center`}
          >
            {unreadCount}
          </div>
        ) : null
      ) : null}
      <button onClick={handleNotiBellClick} className="block">
        <img src={NotiBell} alt="notification bell" />
      </button>
      <section
        className={`${isToggleOpen ? "" : "hidden"} 
        left-[-520px] top-[56px] rounded-t-lg rounded-b-lg bg-white shadow 
        gap-y-px absolute z-50 max-h-[800px] overflow-hidden
        px-5 
        `}
      >
        <div className="flex justify-between py-5 px-5  border-b-2 border-[#5576F5] mb-5">
          <div className="text-3xl text-[#5576F5] ">
            {/* <span>
              <strong>HappyLife</strong>
            </span>
            <br /> */}
            <span>
              <strong>Notifications</strong>
            </span>
          </div>
          {markAsReadLoading ? (
            <div className="flex flex-col justify-end ">
              <span className="text-base text-[#5576F5] ">
                <button disabled>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#5576F5"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              </span>
            </div>
          ) : (
            <div className="flex flex-col justify-end ">
              <span className="text-base text-[#5576F5] ">
                <button onClick={markAsRead}>
                  <u> Mark all notifications as read</u>
                </button>
              </span>
            </div>
          )}
        </div>
        <div className="max-h-[500px] overflow-y-scroll" ref={scrollRef}>
          <div
            className={`${
              notiArr.length === 0 ? "h-[500px] w-[520px]" : "hidden"
            }`}
          >
            <div className="text-center pt-[10px]">No notification to show</div>
          </div>

          {notiArr.map((item) => (
            <div
              key={uuidv4()}
              className="flex pt-[46px] pb-[46px] pl-[14px] pr-[14px] border-b-2 border-[#5576F5]"
            >
              {NotiIcon.map((arr) =>
                arr.notiType === item.notiType ? (
                  <img
                    key={uuidv4()}
                    src={arr.Icon}
                    alt="NotiIcon"
                    className="object-contain w-16 pr-[14px] max-h-[64px] max-w-[64px]"
                  />
                ) : null
              )}
              <div>
                <div className="flex">
                  <strong className="mr-[10px]">{item.notiTitle}</strong>
                  <div
                    className={`${
                      item.notiStatus === true ? "hidden" : ""
                    } rounded-lg w-auto h-auto bg-blue-100 pl-2 pr-2 text-center`}
                  >
                    New
                  </div>
                </div>

                <p className="text-base">{item.notiContent}</p>
                <p className="text-right text-sm italic font-normal pr-[10px]">
                  {item.createdAt ? item.createdAt.slice(0, 10) : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center p-[10px] mx-[30px] my-[10px] bg-[#F9F9F9] rounded-lg border">
          <button onClick={handleSeeMore}>See more</button>
        </div>
      </section>
    </body>
  );
};
export default Notification;
