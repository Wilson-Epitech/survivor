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
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
                            Coaches
                        </h1>
                        <Link
                            href='/coaches/create_employee'
                            className="flex flex-row text-white bg-[#2C84B9] hover:bg-[#5197c3] p-1 text-md rounded-md py-1.5 px-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 mr-1 size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            New Employee
                        </Link>
                    </div>

                    <div className="flex flex-row gap-6 w-full h-full rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
                        <table className="w-full text-left text-sm font-light">
                            <thead className="border-2 border-[#E4E6EF] bg-white text-[#8B9FB7] font-medium">
                                <tr>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">#</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Coach</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Email</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Phone</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Number of customers</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Actions</th>
                                </tr>
                            </thead>
                            {coach.map((user, index) => (
                                <tbody>
                                    <tr className="border-2 border-[#E4E6EF] bg-white">
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">{user._id_employee}</td>
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">{user._name} {user._surname}</td>
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">{user._email}</td>
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">00000000</td>
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">0</td>
                                        <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2"><Dropdown_coach key={user._id_employee || index} onSelectionChange={handleSelectionChange} coach_id={user._id_employee} /></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
            </main>
        </Layout>
    );
}
