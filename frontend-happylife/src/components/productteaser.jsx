/* eslint-disable react/jsx-key */
import Insurance from "../assets/Insurance.jpg";
import DownArrow from "../assets/DownArrow.png";
import DownArrowBlack from "../assets/DownArrowBlack.png";
import FamilyPractice from "../images/family.png";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ClaimAPI from "../../api/claimApi";
import moment from "moment";
import EyeIcon from "../assets/EyeIcon.png";
import { Routes, Route, Link } from "react-router-dom";
import PlanAPI from "../../api/plansApi";

const productteaser = (props) => {
  // this is for claim detail toggle (above)
  const [toggle, setToggle] = useState(false);
  const [arrrowClickStatus, setArrowClickStatus] = useState(false);
  // this is for message toggle (bottom)
  const [toggleMessage, setToggleMessage] = useState(false);
  const [arrrow2ClickStatus, setArrow2ClickStatus] = useState(false);
  const user1 = useSelector((state) => state.auth.login.currentUser);
  const [realtimePlan, setRealtimePlan] = useState();

  // Get claim by regis of user
  const [realtimeClaim, setRealtimeClaim] = useState([]);
  console.log("pro", props);
  // console.log("props?.realtimeRegis?.regisId: ", props?.realtimeRegis?.regisId);
  // const fetchPlan = async () => {
  //   console.log("go in fetch plan in productteaser");
  //   try {
  //     const res = await PlanAPI.getPlanByRegisId(
  //       props?.realtimeRegis?.regisId,
  //       user1?.token
  //     );
  //     console.log("FETCH PLAN SUCCESS!");
  //     setRealtimePlan(res.data);

  //     console.log("res plan", res.data);
  //   } catch (error) {
  //     console.log("error in fetchPlan", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPlan();
  // }, []);
  const fetchClaim = async () => {
    try {
      console.log("go in fetch claim in productteaser");

      const res = await ClaimAPI.getAllClaimsOfUserByRegis(
        user1?.token,
        props?.realtimeRegis?.regisId
      );
      setRealtimeClaim(res.data);
      console.log("res realtimeClaim by regis in Claim:", res.data);
    } catch (error) {
      console.log("error in claim of regis in claim page", error);
    }
  };
  useEffect(() => {
    fetchClaim();
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-center relative h-auto min-h-[317px] w-[1415px] bg-white rounded-lg border-x-5 border-gray-200 ">
        <img
          // src={props.realtimeRegis.productInfo.planURL}
          src={Insurance}
          alt="Insurance Logo"
          className="rounded-lg w-[532px] h-[317px] absolute inset-y-0 left-0"
        ></img>
        <div className="flex flex-col ml-[450px] mt-[38px]">
          <h1 className="font-semibold text-2xl mb-[20px]">
            {props.realtimeRegis.productInfo.planName}
          </h1>
          <div className="w-[716px] h-auto min-h-[100px] max-h-[100px] overflow-y-auto ">
            <div className="font-semibold text-xl">Benefit:</div>
            {/* <ul>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
                <li>    - Name - dependencies:  - insuranceAmount:  </li>
            </ul> */}
            <ul>
              {props.realtimeRegis.productInfo.optionalBenefits.map(
                (bf, index) => (
                  <li>
                    {bf.benefitName} - insuranceAmount: {bf.insuranceAmount}{" "}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="leading-[36px] text-custom-blue-3 font-semibold ml-[22px]">
            <label>START DATE</label>
            <label className="ml-[120px]">END DATE</label>
          </div>
          <div>
            <div className="w-[144px] h-[48px] py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex">
              {moment(props.realtimeRegis.startDate).format("DD/MM/YYYY")}
            </div>
            <div className="w-[144px] h-[48px] ml-[65px] py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex">
              {moment(props.realtimeRegis.endDate).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[-65.5px] ml-[1300px] relative z-40 ">
        {arrrowClickStatus === false ? (
          <img
            src={DownArrow}
            alt="Down Arrow"
            onClick={() => {
              setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus);
            }}
            className="ml-[10px]"
          ></img>
        ) : (
          <img
            src={DownArrow}
            alt="Down Arrow"
            onClick={() => {
              setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus);
            }}
            className="ml-[10px] rotate-180"
          ></img>
        )}
        {toggle && (
          <div className="relative ml-[-1300px] mt-[30px] pt-[30px]  leading-[36px] font-semibold bg-white">
            <div className="relative overflow-x-auto bg-bgr-white">
              <div className="h-auto w-auto max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-base text-gray-700 uppercase bg-white sticky top-0">
                    <tr className="text-center">
                      <th className="px-6 py-4 ">Detail</th>
                      <th className="px-6 py-4 ">Claim Amount</th>
                      <th className="px-6 py-4">DATE CREATE</th>
                      <th className="px-6 py-4">PAYMENT STATUS</th>
                      <th className="px-6 py-4">message</th>
                    </tr>
                  </thead>

                  <tbody>
                    {realtimeClaim.map((claim, index) => (
                      <tr className="bg-white border-b text-center items-center  mb-[50px]">
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <Link to={`/claimdetail/${claim?.claimId}`}>
                            <button className="w-auto h-auto p-2">
                              <img src={EyeIcon} alt="Detail" />
                            </button>
                          </Link>
                        </th>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                          {claim?.claimAmount}
                        </td>
                        <td className="px-6 py-4">
                          {moment(claim?.updatedAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4  ">
                          <div
                            className={`w-[150px] h-[44px]  inline-flex items-center justify-center rounded
                                         ${
                                           claim?.status === "Approved"
                                             ? " border bg-teal-50 border-green-300 text-green-400"
                                             : ""
                                         }
                                         ${
                                           claim?.status === "Pending Review"
                                             ? "border bg-sky-100 border-sky-300 text-sky-400"
                                             : ""
                                         }
                                         ${
                                           claim?.status === "Denied"
                                             ? "border bg-rose-200 border-red-700 text-red-700 "
                                             : ""
                                         }
                                         ${
                                           claim?.status === "Payment Issued"
                                             ? "border bg-rose-200 border-red-700 text-red-700"
                                             : ""
                                         }
                                         ${
                                           claim?.status === "In Process"
                                             ? "border bg-yellow-100 border-yellow-300 text-yellow-400"
                                             : ""
                                         }
                                         ${
                                           claim?.status ===
                                           "Pending Additional Information"
                                             ? "border bg-orange-100 border-orange-300 text-orange-400"
                                             : ""
                                         }
                                   `}
                          >
                            {claim?.status}
                            {/* <div className='w-[150px] h-[44px]  inline-flex items-center justify-center rounded border bg-orange-100 border-orange-300 text-orange-400'>
                                 Pending Additional Information

                                  </div>
                                  <div className='w-[150px] h-[44px]  inline-flex items-center justify-center rounded border bg-yellow-100 border-yellow-300 text-yellow-400'>
                                  In Process */}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <div className="w-auto h-auto max-w-[400px] max-h-[200px] overflow-y-auto text-justify">
                              {claim?.message?.[0]?.content}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default productteaser;
