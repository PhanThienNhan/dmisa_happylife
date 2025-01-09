import { useState, useEffect } from "react";
import NotiAPI from "../../api/notificationApi";
import usePagination from "./usePagination";

const useNotification = (user1, scrollRef) => {

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(null);
  const [fetchLoading, setfetchLoading] = useState(false);
  const [markAsReadLoading, setMarkAsReadLoading] = useState(false);
  
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  //const [notiArr, setNotiArr] = useState([]);
  
  const {notiArr, pagination, handleSeeMore}  = usePagination(user1, notifications, scrollRef);
  const toggleNoti = () => {
    setIsToggleOpen((previous) => !previous);
  }

  const fetchNoti = async () => {
    setfetchLoading(true);
    try {
      const res = await NotiAPI.getNumberNotiStatusFalse(user1?.token);
      setNotifications(res.data?.notificationResDTOS);
      setUnreadCount(res.data?.amountOfFalseStatus);
      console.log("res not read noti", res.data);
    } catch (error) {
      console.log("error in fetchNoti", error);
    } finally {
        setfetchLoading(false);
        console.log("run useNotification, unreadNoti: ", unreadCount);

    }

  };

  const markAsRead = async () => {
    setMarkAsReadLoading(true);
        if (unreadCount != 0) {
          console.log("update noti status");
          try {
            const notiUpdateRes =  await NotiAPI.updateNotiStatus(
              user1,
              user1?.token
            );
            console.log("notiUpdateRes:", notiUpdateRes.data);
            await fetchNoti();
            // console.log("Check if data inpagination is newest: ", notifications);
            // pagination(notifications.slice().reverse(), 0, 10);
          } catch (err) {
            console.log("err:", err);
          }
          finally{
            setMarkAsReadLoading(false);
          }
        }
        else {
          setTimeout(()=>{
            setMarkAsReadLoading(false);
          }, 2000);
        }
 }

  const handleNotiBellClick = async (e) => {
    e.preventDefault();
    toggleNoti();
    //pagination(notifications.slice().reverse(), 0, 10);
  };

  useEffect(() => {
    console.log("fetch noti again! ");
    fetchNoti();
  }, []);

  useEffect(()=>{
    pagination(notifications.slice().reverse(), 0, 10);
  },[notifications])

   //Uncomment to auto reload
    // useEffect(() => {
    //     const intervalId = setInterval(()=>{
    //         fetchNoti();  
    //     }, 15000);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // },[])

  console.log("notiArr inside useNotification:", notiArr);
  console.log("markAsReadLoading Now is: ", markAsReadLoading);
  console.log("run return!");
  return {notiArr, notifications, unreadCount, fetchLoading, markAsReadLoading, isToggleOpen, fetchNoti, markAsRead, handleNotiBellClick, toggleNoti, handleSeeMore};
}

export default useNotification;