import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () =>
{
    return (
        <aside className="sm:w-0 md:w-0 lg:w-1/6 w-1/6 mt-10 mb-10 border-r-2 border-r-black hidden sm:block">
            <nav className="flex flex-col gap-2">
                <div className="mt-10 overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 dark:border-gray-700">
                    <ul className="p-1 mb-2 text-3xl font-medium">
                        <li className="flex flex-col pb-3">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Home
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Coaches
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Customers
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Statistics
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Tips
                            </a>
                            <div className="flex items-center justify-between border-b-2 border-gray-900"></div>
                        </li>
                        <li className="flex flex-col pb-2">
                            <a className="cursor-pointer hover:bg-[#878787] p-1">
                                Events
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}

export default Navbar