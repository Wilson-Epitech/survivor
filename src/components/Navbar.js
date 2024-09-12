"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { logout } from "@/app/logout/logout";

const Navbar = () => {
    const inactiveLink = 'relative block py-2 text-[#30445E] text-sm';
    const activeLink = 'relative block py-2 text-[#2D6EB8] text-sm';
    const pathname = usePathname();

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="flex items-center justify-between w-full p-2">

                <Link href='/' className="text-[#30445E] text-lg font-semibold ml-2">
                    Soul Connection
                </Link>

                <div className="flex-1 flex justify-center">
                    <ul className="flex space-x-8">
                        <li>
                            <a href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                                Dashboard
                                {pathname === '/' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="/coaches" className={pathname === '/coaches' ? activeLink : inactiveLink}>
                                Coaches
                                {pathname === '/coaches' && (
                                    <span className="absolute left-0 right-0 bottom-[-8px] h-[3px] bg-[#2D6EB8] w-full"></span>
                                )}
                            </a>
                        </li>
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

                <div className="ml-auto">
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
