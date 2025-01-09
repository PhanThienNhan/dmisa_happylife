import { useState} from "react";

const usePagination = (user1, notifications, scrollRef) => {
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(10);
  console.log("Scroll Ref in pagination: ", scrollRef);
  const [notiArr, setNotiArr] = useState([]);


  const pagination = (arr, a, b) => {
    setNotiArr(arr.slice(a, b));
  };

  const handleSeeMore = () => {
    scrollRef.current.scrollTo = scrollRef.current;
    console.log("scrollRef inside handleSeeMore: ", scrollRef);
    setToIndex(toIndex + 10);
    pagination(notifications.slice().reverse(), fromIndex, toIndex);
  };

  console.log("notiArr inside usePagination: ", notiArr);
 


  return {notiArr,pagination, handleSeeMore};
};

export default usePagination;
