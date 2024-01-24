import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import UserAPI from '../../../api/userApi';
import Avartar from '../../assets/avatar.png' 
const information = () => {
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    const [realtimeUser, setRealtimeUser] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    //const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [citizenId, setCitizenId] = useState('');
  
    //Chuyển đổi date thành dạng dd/mm/yyyy
    const formatISODateToDDMMYYYY = (isoDate) => {
        const dateObj = new Date(isoDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`;
    };


    const fetchUser = async () => {
      try{
        const res = await UserAPI.getUser(user1?.token, user1?.userInfo?.id);
        setRealtimeUser(res.data);
        setPhoneNumber(res.data.phoneNumber)
        setFullName(res.data.fullName);
        setGender(res.data.gender)
        setEmail(res.data.email)
        setDob(formatISODateToDDMMYYYY(res.data.dob))
        setAddress(res.data.address)
        setCitizenId(res.data.citizenId)
        console.log('res', res.data)
      }
      catch (error){
        console.log("error in fetchUser", error)
      }
    }
    useEffect(() => {
      fetchUser();
      
    },[])


    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        // Chuyển đổi chuỗi ISO thành đối tượng Date
        const dateObject = new Date(realtimeUser.dob);
        // Lấy ngày, tháng và năm
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = dateObject.getFullYear();
        // Định dạng lại thành chuỗi 'dd/mm/yyyy'
        const formattedDate = `${day}/${month}/${year}`;
      };

    

    // **** UPDATE USER **** //

    const handleUpdate = async (e) => {
        {
            e.preventDefault();
            console.log('update user')
            const newUser = {
                fullName: fullName,
                gender: gender,
                DOB: dob,
                phoneNumber: phoneNumber,
                citizenId: citizenId,
                email: email,
                address: address
            }
            console.log('new User', newUser)
            try{
                const updateUser = await UserAPI.updateUser(newUser, user1?.userInfo?.id, user1?.token);
                console.log("Res", updateUser);
                setIsEdit(!isEdit);
            } catch(err){
                console.log("err: ", err);
                //setNoti("FAIL")
                //console.log(noti);
            }
        }
    }

    /// Handle button edit and update
    const [isEdit, setIsEdit] = useState(false);
    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEdit(!isEdit);
    }

  return (
    <div className=" flex justify-center items-center h-[1180px] bg-slate-50 my-auto flex-col">   
        <form className="w-[1415px] h-auto min-h-[800px] bg-white rounded-lg border border-gray-200 font-sans font-medium text-base">
            <div className='flex justify-center mt-[50px] mb-[32px]'>
                    <div className="w-[100px] h-[100px] p-4  rounded-full ring-1 ring-black">
                        <img src={Avartar} alt="avatar" className='bg-contain'/>
                    </div>
            </div>
            <div className='space-y-[42px]'>
                <div>
                    <div>
                        <label className='ml-[214px] mr-[454px]'>Full name</label>
                    
                        <label>Citizen ID</label>
                    </div>
                    <div className='flex justify-center gap-x-[67px]'>
                        <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                        disabled={!isEdit}
                        >
                    </input>
                    <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                    value={citizenId}
                    onChange={(e)=>setCitizenId(e.target.value)}
                    disabled={!isEdit}
                    >
                    </input>
                    </div>
                    
                </div>
                <div>
                    <div>
                        <label className='ml-[214px] mr-[416px]'>Phone number</label>
                    
                        <label className='mr-[200px]'>Gender</label>
                        <label>Date of birth (dd/mm/yyyy)</label>
                    </div>
                    <div className='flex justify-center gap-[42px]'>
                        <div className='flex gap-x-[67px]'>
                            <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={phoneNumber}
                            disabled={!isEdit}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            >
                            </input>
                            {/* <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={gender}    
                            onChange={(e)=>setGender(e.target.value)}
                            >
                            </input> */}
                            <select id="gender" name="gender"  
                                    className={`w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]`}
                                    defaultvalue={gender} 
                                    onChange={(e)=>setGender(e.target.value)}
                                    disabled={!isEdit}
                                    >
                                        <option value="Male" label="Male"></option>
                                        <option value="Female" label="Female"></option>
                            </select>
                        </div>
                        <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                        id="dob"
                        //type="date"
                        value={dob}
                        onChange={(e)=>setDob(e.target.value)}
                        disabled={!isEdit}
                        //onChange={handleDateChange}
                        
                        >
                        </input>
                    </div>
                </div>

                <div>
                    <div>
                        <label className='ml-[214px]'>
                            Email
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        disabled={!isEdit}
                        >
                        </input>
                    </div>
                    <div>
                        <label className='ml-[214px]'>
                            Address
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        disabled={!isEdit}
                        >
                        </input>
                    </div>
                    {/* <div>
                        <label className='ml-[214px]'>
                            Health status
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[61px] bg-white rounded border border-neutral-200 p-[10px]'
                        //value={realtimeUser.healthstatus}
                        >
                        </input>
                    </div> */}
                    <div className='flex justify-center'>
                        {isEdit === true ? (
                            <div className='flex gap-x-[20px]'>
                                <button 
                            onClick={handleUpdate}
                            className=" w-[200px] h-12 px-6 py-3 bg-green-500 rounded border-2 border-green-500">
                                <div className="text-center text-white text-base font-bold leading-normal">Update Profile</div>
                            </button>
                            <button 
                            onClick={handleEditClick}
                            className=" w-[200px] h-12 px-6 py-3 bg-rose-50 rounded border-2 border-rose-500">
                                <div className="text-center text-rose-500 text-base font-bold leading-normal">Cancel</div>
                            </button>
                            </div>
                        ) : (
                            <button 
                            onClick={handleEditClick}

                            className=" w-[377px] h-12 px-6 py-3 bg-indigo-50 rounded border-2 border-indigo-500">
                                <div className="text-center text-indigo-500 text-base font-bold leading-normal">Edit</div>
                            </button>
                        )}
                        
                    </div>
                </div>
            </div>
            

        </form>
        </div>
    )
}

export default information
