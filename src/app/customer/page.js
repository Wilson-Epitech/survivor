"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/DropdownCustomers";

export default function Home()
{
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
        console.log("Selected Customer IDs:", ids);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/customers').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <Layout>
        <main className="min-h-screen w-fit flex-col items-center grid justify-items-stretch bg-white">
            <div className="h-4/6 flex-row pt-7 mx-10 mb-48">
                <div className="mb-4">
                    <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                        Customers
                    </h1>
                </div>
                <div className="w-full h-0.5 bg-black mb-4"></div>
                <div className="w-full flex flex-row h-fit">
                    <div className="w-3/4 h-fit">
                        <div className="w-full h-12">
                            <Dropdown onSelectionChange={handleSelectionChange} />
                        </div>
                        <div className="w-full h-12">
                            <p className="mt-2 mb-2 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900">
                                {(users.find(user => user._id_customer === selectedCustomerIds.at(selectedCustomerIds.length - 1))?._name)} {(users.find(user => user._id_customer === selectedCustomerIds.at(selectedCustomerIds.length - 1))?._surname)}
                            </p>
                        </div>
                        <div className="w-full h-12">
                            <p className="text-left text-2xl leading-9 tracking-tight text-gray-900">
                                22/07/2004
                            </p>
                        </div>
                        <div className="w-full h-12">
                            <p className="text-left text-2xl leading-9 tracking-tight text-gray-900">
                                4 Rue de la Tour 34000 Montpellier, France
                            </p>
                        </div>
                    </div>
                    <div className="w-1/4 flex-none mb-4">
                        <img className="object-contain w-full h-36" src="https://cdn-uploads-frankfurt.starofservice.com/uploads/pj/thumbs-medium/starofservice_829605etw5ii.jpeg"></img>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>
                <div className="flex flex-row gap-6">
                    <div className="w-fit sm:-mx-6 lg:-mx-8">
                        <div className="inline-block w-full py-2 sm:px-12 lg:px-8">
                            <div className="overflow-hidden">
                                <h2 className="font-bold  text-2xl mb-4">Payments</h2>
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead
                                        className="border-2 border-black bg-[#2C84B9] font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                        <tr>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Date</th>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Amount</th>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Mark</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Otto</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@mdo</td>
                                        </tr>
                                        <tr
                                            className="border-2 border-black bg-white dark:border-neutral-500 dark:bg-neutral-600">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Jacob</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Thornton</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@fat</td>
                                        </tr>
                                        <tr
                                            className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4"> Larry the Bird</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4"> Larry the Bird</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit sm:-mx-6 lg:-mx-8">
                        <div className="inline-block w-full py-2 sm:px-12 lg:px-8">
                            <div className="overflow-hidden">
                                <h2 className="font-bold  text-2xl mb-4">Meetings</h2>
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead
                                        className="border-2 border-black bg-[#2C84B9] font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                        <tr>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Date</th>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Rating</th>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Report</th>
                                            <th scope="col" className="px-12 py-4 border-2 border-black text-white">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Mark</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Otto</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@mdo</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@mdo</td>
                                        </tr>
                                        <tr
                                            className="border-2 border-black bg-white dark:border-neutral-500 dark:bg-neutral-600">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Jacob</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Jacob</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">Thornton</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@fat</td>
                                        </tr>
                                        <tr
                                            className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4"> Larry the Bird</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4"> Larry the Bird</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4"> Larry the Bird</td>
                                            <td className="whitespace-nowrap border-2 border-black px-12 py-4">@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </Layout>
    );
}
