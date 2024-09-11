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
        }).catch(err => console.error(err))
    }, []);

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
    };

    return (
        <Layout>
            <main className="w-full min-h-screen h-full bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
                    <div className="mb-4 flex flex-col items-start gap-2">
                        <h1 className="mt-2 text-left text-3xl font-bold leading-9 tracking-tight text-[#2D425C]">
                            Coaches List
                        </h1>
                        <p className="text-[#889DB9] text-sm">You have total {coach.length} coaches.</p>
                    </div>
                    <div className="mb-4 flex flex-col items-end gap-4">
                        <Link
                            href='/coaches/create_employee'
                            className="p-1.5 text-white bg-[#2362B3] hover:bg-[#2361b3e0] text-md rounded-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                        </Link>
                    </div>

                    <div className="flex flex-row gap-6 w-full h-full rounded-sm bg-white py-4 px-4">
                        <table className="table-auto w-full text-left text-sm">
                            <thead className="border-y-2 bg-white text-[#889DB9]">
                                <tr>
                                    <td scope="col" className="px-4 py-2">#</td>
                                    <td scope="col" className="px-4 py-2">Coach</td>
                                    <td scope="col" className="px-4 py-2">Email</td>
                                    <td scope="col" className="px-4 py-2">Phone</td>
                                    <td scope="col" className="px-4 py-2">Number of customers</td>
                                    <td scope="col" className="px-4 py-2">Actions</td>
                                </tr>
                            </thead>
                            {coach.map((user, index) => (
                                <tbody>
                                    <tr className="border-y-2 border-[#E4E6EF] bg-white ">
                                        <td className="whitespace-nowrap px-4 py-2">
                                            {user._id_employee}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2">{user._name} {user._surname}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{user._email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">00000000</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">0</td>
                                        <td className="whitespace-nowrap px-4 py-2"><Dropdown_coach key={user._id_employee || index} onSelectionChange={handleSelectionChange} coach_id={user._id_employee} /></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
            </main>
        </Layout>
    );
}
