"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import Dropdown_coach from "@/components/dropdown_customers_coach";
import Link from "next/link";

export default function Home() {
    const [coach, setCoach] = useState([]);

    useEffect(() => {
        axios.get('/api/employee/coachs').then(response => {
            setCoach(response.data);
        });
    }, []);

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
    };

    return (
        <Layout>
            <main className="h-screen sm:w-fit md:w-fit lg:w-full flex-col items-center bg-white">
                <div className="mx-10 mt-24 h-4/5">
                    <div className="mb-4 flex shrink-0 items-end">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Coaches
                        </h1>
                        <Link
                            href='/coaches/create_employee'
                            className="flex flex-row text-white bg-[#2C84B9] p-1 text-md rounded-md py-1.5 px-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 mr-1 size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            New client
                        </Link>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>

                    <div className="flex flex-row gap-6 w-full h-full overflow-auto border-t-2 border-b-2 border-black">
                        <table className="w-full text-left text-sm font-light">
                            <thead className="border-2 border-black bg-[#2C84B9] font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                <tr>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">#</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Name</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Birth Date</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Customers</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Last connection</th>
                                </tr>
                            </thead>
                            {coach.map((user, index) => (
                                <tbody>
                                    <tr className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="whitespace-nowrap border-2 border-black px-4 py-2">{user._id_employee}</td>
                                        <td className="whitespace-nowrap border-2 border-black px-4 py-2">{user._name} {user._surname}</td>
                                        <td className="whitespace-nowrap border-2 border-black px-4 py-2">{user._birth_date}</td>
                                        <td className="whitespace-nowrap border-2 border-black px-4 py-2"><Dropdown_coach key={user._id_employee || index} onSelectionChange={handleSelectionChange} coach_id={user._id_employee} /></td>
                                        <td className="whitespace-nowrap border-2 border-black px-4 py-2">03-09-2024</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
