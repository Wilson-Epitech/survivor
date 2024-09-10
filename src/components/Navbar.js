"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import { logout } from "@/app/logout/logout";

const Statistics = () =>
{
    return (
        <li className="flex flex-col pb-2">
            <a href={'/statistics'} className="cursor-pointer hover:bg-[#878787] p-1">
                Statistics
            </a>
            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
        </li>
    )
}

const Coaches = () =>
{
    return (
        <li className="flex flex-col pb-2">
            <a href={'/coaches'} className="cursor-pointer hover:bg-[#878787] p-1">
                Coaches
            </a>
            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
        </li>
    )
}

const DisplayCoaches = ({role}) =>
{
    if (role) {
        if (role !== "Coach")
            return <Coaches />
    }
    return null;
}

const DisplayStatistics = ({role}) =>
{
    if (role) {
        if (role !== "Coach")
            return <Statistics />
    }
    return null;
}

const Navbar = () =>
{
    const [employeeRole, setEmployeeRole] = useState(0);
    const [isHamburger, setIsHamburger] = useState(0);

    const changeHamburger = () => {
        setIsHamburger(() => {
            if (isHamburger === 1)
                return 0;
            return 1;
        });
    };

    const resetHamburger = () => {
        setIsHamburger(() => {
            return 0;
        });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/role').then(response => {
            setEmployeeRole(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                resetHamburger();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <aside className={`lg:w-56 w-0 mt-10 mb-10 lg:border-r-2 lg:border-r-black ${isHamburger === 0 ? '' : 'bg-white h-full w-56 min-w-56 group-hover:visible absolute border-b-2 border-r-2 border-black'}`}>
            <nav className="flex flex-col gap-2">
            <div className="flex pl-4 w-full lg:hidden group-hover:visible absolute">
                        <button onClick={() => changeHamburger()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                <div className="mt-10 overflow-y-auto py-5 lg:px-3 h-full bg-white dark:bg-gray-800 dark:border-gray-700">
                    <ul className={`p-1 mb-2 text-3xl font-medium lg:block lg:w-full w-0 ${isHamburger === 0 ? 'hidden' : 'w-full block'}`}>
                        <li className="flex flex-col pb-3">
                            <a href={'/'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Home
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <DisplayCoaches role={employeeRole} />
                        <li className="flex flex-col pb-2">
                            <a href={'/customers'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Customers
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a href={'/wardrobe'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Clothing
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a href={'/astrological'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Astrological
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <DisplayStatistics role={employeeRole} />
                        <li className="flex flex-col pb-2">
                            <a href={'/tips'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Tips
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a href={'/event'} className="cursor-pointer hover:bg-[#878787] p-1">
                                Events
                            </a>
                        </li>
                    </ul>
                    <div className="absolute bottom-0 pb-2">
                        <button type="submit" onClick={() => {logout()}} className="flex w-full justify-center rounded-md bg-[#878787] px-4 py-2 text-mb font-semibold leading-6 text-white shadow-sm hover:bg-[#b6b6b6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log out</button>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Navbar