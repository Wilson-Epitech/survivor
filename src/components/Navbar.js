"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { logout } from "@/app/logout/logout";
import { useEffect, useState } from "react";
import axios from 'axios';
import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
} from "tw-elements-react";

const Coaches = ({pathname, activeLink, inactiveLink}) =>
{
    return (
        <li>
            <a href="/coaches" className={pathname === '/coaches' ? activeLink : inactiveLink}>
                Coaches
                {pathname === '/coaches' && (
                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                )}
            </a>
        </li>
    )
}

const DisplayCoaches = ({role, pathname, activeLink, inactiveLink}) =>
{
    if (role) {
        if (role !== "Coach")
            return <Coaches pathname={pathname} activeLink={activeLink} inactiveLink={inactiveLink} />
    }
    return null;
}

const Navbar = () => {
    const [employeeRole, setEmployeeRole] = useState(0);
    const inactiveLink = 'relative block py-2 text-[#30445E] text-sm';
    const activeLink = 'relative block py-2 text-[#2D6EB8] text-sm';
    const pathname = usePathname();

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/role').then(response => {
            setEmployeeRole(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="flex items-center justify-between w-full p-2">

                <Link href='/' className="text-[#30445E] text-lg font-semibold ml-2">
                    Soul Connection
                </Link>

                <div className="flex-1 lg:flex justify-center hidden lg:visible ">
                    <ul className="flex space-x-8">
                        <li>
                            <a href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                                Dashboard
                                {pathname === '/' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <DisplayCoaches role={employeeRole} pathname={pathname} activeLink={activeLink} inactiveLink={inactiveLink}/>
                        <li>
                            <a href="/customers" className={pathname === '/customers' ? activeLink : inactiveLink}>
                                Customers
                                {pathname === '/customers' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="/tips" className={pathname === '/tips' ? activeLink : inactiveLink}>
                                Tips
                                {pathname === '/tips' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="/events" className={pathname === '/events' ? activeLink : inactiveLink}>
                                Events
                                {pathname === '/events' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="/clothing" className={pathname === '/clothing' ? activeLink : inactiveLink}>
                                Clothing
                                {pathname === '/clothing' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="/astrological" className={pathname === '/astrological' ? activeLink : inactiveLink}>
                                Astrological
                                {pathname === '/astrological' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                    </ul>
                </div>
                <TEDropdown className="flex-1 flex justify-end lg:hidden">
                    <TEDropdownToggle className="flex items-center px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border-2 border-[#DEE3ED] rounded-lg bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    <TEDropdownMenu className="flex flex-col text-sm px-3">
                        <TEDropdownItem>
                            <a href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                                Dashboard
                                {pathname === '/'}
                            </a>
                        </TEDropdownItem>
                        <DisplayCoaches role={employeeRole} pathname={pathname} activeLink={activeLink} inactiveLink={inactiveLink}/>
                        <TEDropdownItem>
                            <a href="/customers" className={pathname === '/customers' ? activeLink : inactiveLink}>
                                Customers
                                {pathname === '/customers'}
                            </a>
                        </TEDropdownItem>
                        <TEDropdownItem>
                            <a href="/tips" className={pathname === '/tips' ? activeLink : inactiveLink}>
                                Tips
                                {pathname === '/tips'}
                            </a>
                        </TEDropdownItem>
                        <TEDropdownItem>
                            <a href="/events" className={pathname === '/events' ? activeLink : inactiveLink}>
                                Events
                                {pathname === '/events'}
                            </a>
                        </TEDropdownItem>
                        <TEDropdownItem>
                            <a href="/clothing" className={pathname === '/clothing' ? activeLink : inactiveLink}>
                                Clothing
                                {pathname === '/clothing'}
                            </a>
                        </TEDropdownItem>
                        <TEDropdownItem>
                            <a href="/astrological" className={pathname === '/astrological' ? activeLink : inactiveLink}>
                                Astrological
                                {pathname === '/astrological'}
                            </a>
                        </TEDropdownItem>
                        <TEDropdownItem>
                            <div className="pt-2 w-full border-t-2 border-[#E4E6EF]">
                                <button
                                    type="button"
                                    onClick={() => {logout()}}
                                    className="text-white bg-[#2D6EB8] hover:bg-[#4c7db5] font-medium rounded-lg text-sm px-4
                                    py-2 text-center w-full mb-2">
                                    Logout
                                </button>
                            </div>
                        </TEDropdownItem>
                    </TEDropdownMenu>
                  </TEDropdownToggle>
                </TEDropdown>

                <div className="ml-auto lg:flex hidden lg:visible">
                    <button
                        type="button"
                        onClick={() => {logout()}}
                        className="text-white bg-[#2D6EB8] hover:bg-[#4c7db5] font-medium rounded-lg text-sm px-4
                        py-2 text-center mr-2">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
