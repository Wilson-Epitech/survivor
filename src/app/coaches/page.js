"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import Dropdown_coach from "@/components/dropdown_customers_coach";
import Link from "next/link";

export default function Home() {
    const [coach, setCoach] = useState([]);
    const [numberCustomer, setCustoNb] = useState([]);
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [showSearchbar, setShowSearchbar] = useState(true);

    useEffect(() => {
        axios.get('/api/employee/coachs')
            .then(response => setCoach(response.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        coach.forEach((thisCoach) => {
            const isAlreadyInList = numberCustomer.some(nbr => nbr._id === thisCoach._id_employee);

            if (!isAlreadyInList) {
                axios.get(`/api/customers/count_customers_by_coach?id=${thisCoach._id_employee}`)
                    .then(response => {
                        setCustoNb(prev => [...prev, response.data]);
                    })
                    .catch(error => {
                        console.error("Failed to fetch customers", error);
                    });
            } else {
                console.log("nop");
            }
        });
    }, [coach]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
    };

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <Layout>
            <main className="w-full min-h-screen h-full bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
                            Coaches List
                        </h1>
                        <p className="text-[#889DB9] text-sm mb-2">You have total {coach.length} coaches.</p>
                    </div>
                    <Link
                        href='/coaches/create_employee'
                        className="p-1.5 text-white bg-[#2362B3] hover:bg-[#2361b3e0] text-md rounded-[3px] flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </Link>
                </div>

                <div className="flex flex-col gap-6 w-full h-full rounded-sm bg-white py-4 px-4">

                    <div className={`h-10 w-full flex flex-row gap-4 ${showSearchbar ? "justify-center" : "justify-end"}`}>
                        {showSearchbar ?
                        <div className="w-full">
                            <input id="search_bar" name="search_bar" type="text" placeholder="Search a customer" value={inputValue} onChange={handleInputChange} className="block w-full rounded-md py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 sm:text-sm sm:leading-6"/>
                        </div> : ''
                        }
                        <div className="flex justify-center h-full">
                            <button onClick={() => {setShowSearchbar(!showSearchbar)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <table className="table-auto w-full text-left text-sm">
                        <thead className="border-y-2 bg-white text-[#889DB9]">
                            <tr>
                                <td scope="col" className="px-4 py-2">#</td>
                                <td scope="col" className="px-4 py-2">Coach</td>
                                <td scope="col" className="px-4 py-2">Email</td>
                                <td scope="col" className="px-4 py-2">Number of customers</td>
                                <td scope="col" className="px-4 py-2">Last Connection</td>
                                <td scope="col" className="px-4 py-2">Actions</td>
                            </tr>
                        </thead>
                        {coach.filter(item => item._name.toLowerCase().includes(inputValue.toLowerCase())).map((user, index) => (
                            <tbody>
                                <tr className="border-y-2 border-[#E4E6EF] bg-white ">
                                    <td className="whitespace-nowrap px-4 py-2">{user._id_employee}</td>
                                    <td className="whitespace-nowrap px-4 py-2">{user._name} {user._surname}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{user._email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{numberCustomer.find(nbr => nbr._id === user._id_employee)?._nb}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{user._last_connexion}</td>
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
