/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import logo from '../../assets/logo-staff.svg'
import styles from './managerSidebar.module.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {HeartIcon, ArrowLeftOnRectangleIcon,  CreditCardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
const ManagerSidebar = (props) => {
    const {isSidebarOpen} = props
    const location = useLocation()
    
    const pathname = location.pathname
    const navigate = useNavigate()
    const navTitles = [
        {name: 'Plan', icon: <HeartIcon key="1" className='w-8 h-8 mr-4'/>, pathname: 'plan'}, 
        {name: 'Registration', icon: <ArrowLeftOnRectangleIcon key="2" className='w-8 h-8 mr-4'/>, pathname: 'registration'},
        {name: 'Claim', icon: <CreditCardIcon key="3" className='w-8 h-8 mr-4'/>, pathname: 'claim'},
    ]
    const handleClickNavigation = (navPath) => {
      
        const path = '/staff/insuarancemanagement/' + navPath
    
        navigate(path);
    }
    useEffect(() => {
        // Function to make the sidebar sticky
        const makeSidebarSticky = () => {
          const sidebar = document.getElementById('sidebar');
    
          if (sidebar) {
            const stickyOffset = sidebar.offsetTop;
    
            const handleScroll = () => {
              if (window.scrollY > stickyOffset) {
                sidebar.classList.add(`${styles.sticky}`);
              
              } else {
               
                sidebar.classList.remove(`${styles.sticky}`);
                
              }
            };
    
            window.addEventListener('scroll', handleScroll);
    
            // Cleanup event listener on component unmount
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }
        };
    
        makeSidebarSticky();
      }, []);
     

    
    return (
      <div className={`relative ${isSidebarOpen?'w-[16%]':'w-[4%]'} transition-all ease-in-out duration-5000`}>
        <menu className={`${isSidebarOpen ? styles.container: styles.smallContainer}`}  id="sidebar">
            <div className="logo flex flex-2 flex-row p-4 mt-12">
              <div className={`
                ${isSidebarOpen ? 'mr-4 w-auto h-auto ':'w-12 h-12'}`
              }>
              <img src={logo} alt="logo" />
              </div>
               
                 <div className="logo-left">
                    {/* <FolderMinusIcon/> */}
                    {isSidebarOpen ? (
                        <>
                            <p className="sm1:text-xs sm:text-sm md:text-lg lg:text-[1.5em] font-bold font-sans ">HAPPY LIFE</p>
                            <p className="sm1:text-xs sm:text-xs md:text-xs lg:text-[10px]">WHERE LAUGHTERS LIVE</p>
                        </>
                    ):(<></>)}
                    
                 </div>
            </div>
            <ul className='mt-24'>
                {navTitles.map((e)=>(
                <li className={`flex font-semibold ml-6 mb-8 
                ${pathname.includes(e.pathname) ? 'text-blue-600' : ''}
                ${isSidebarOpen ? '':'w-12'}`} 
                key={e.pathname}
                onClick={()=>handleClickNavigation(e.pathname)}
                
                >
                {e.icon}
                {isSidebarOpen?e.name: ""}
              </li>
                ))}
              
            </ul>
            <ul className='mb-24 absolute bottom-0'>
                <li className='flex font-semibold ml-6' key=''>
                    <ArrowRightOnRectangleIcon className='w-8 h-8 mr-4 '/>
                    {isSidebarOpen?"Sign out": ""}
                    
                </li>
              
            </ul>
            
        </menu>
        </div>
    )
}

export default ManagerSidebar;