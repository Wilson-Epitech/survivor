"use client"

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { usePathname } from "next/navigation";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//     subsets: ['latin'],
//     weight: ['400', '700'],
// });

const Navbar = () =>
{
    const inactiveLink = 'block py-2 text-[#30445E] text-sm';
    // const activeLink = 'block py-2 text-[#2D6EB8] text-sm';
    const activeLink = 'block py-2 text-[#2D6EB8] text-sm border-b-2 border-[#2D6EB8]';
    const pathname = usePathname();

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"> */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between ml-2 p-2">
                <Link href='/' className="flex z-40 mr-[6rem] text-[#30445E] text-lg font-semibold">
                    Soul Connection
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-[#2D6EB8] hover:bg-[#4c7db5] focus:ring-4 focus:outline-none
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                        Logout
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 border-">
                    <ul
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100
                        rounded-lgbg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0
                        md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a
                                    href="/"
                                    className={pathname === '/' ? activeLink : inactiveLink}>
                                    Dashboard
                                    {/* {pathname === '/' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2D6EB8]"></span>} */}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/coaches"
                                    className={pathname === '/coaches' ? activeLink : inactiveLink}>
                                    Coaches
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/customers"
                                    className={pathname === '/customers' ? activeLink : inactiveLink}>
                                    Customers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tips"
                                    className={pathname === '/tips' ? activeLink : inactiveLink}>
                                    Tips
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/events"
                                    className={pathname === '/events' ? activeLink : inactiveLink}>
                                    Events
                                </a>
                            </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
