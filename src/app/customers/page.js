"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Dropdown from "@/components/DropdownCustomers";
import { useRouter } from 'next/navigation';

export default function Home() {
    const [users, setUsers] = useState([]);
    const router = useRouter();
    // const [userPayement, setUserPayement] = useState([]);

    useEffect(() => {
        axios.get('/api/customers')
            .then(response => setUsers(response.data))
            .catch(err => console.error(err));
    }, []);

    let route;

    const handleClick = (e) => {
        e.preventDefault()
        router.prefetch(route, 20, 40)
        router.push(route)
      }

    // useEffect(() => {
    //     users.forEach((thisUsers) => {
    //         const isAlreadyInList = userPayement.some(payment => payment._id_client === thisUsers._id_customer);

    //         if (!isAlreadyInList) {
    //             axios.get(`/api/orders?id=${thisUsers._id_customer}`)
    //                 .then(response => {
    //                     setUserPayement(prev => [...prev, response.data]);
    //                 })
    //                 .catch(error => {
    //                     console.error("Failed to fetch customers", error);
    //                 });
    //         }
    //     });
    // }, [users]);

    // console.log(userPayement)

    return (
        <Layout>
            <main className="w-full min-h-screen h-full bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4">
                    <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
                        Customers List
                    </h1>
                    <p className="text-[#889DB9] text-sm">You have total {users.length} customers.</p>
                </div>
                <div className="flex flex-row gap-6 w-full h-full overflow-x-auto rounded-sm bg-white py-4 px-4">
                    <table className="table-auto w-full text-left text-sm">
                        <thead className="border-y-2 bg-white text-[#889DB9]">
                            <tr>
                                <th scope="col" className="px-4 py-2 flex gap-4"><input type="checkbox" disabled /> Customer</th>
                                <th scope="col" className="px-4 py-2">Email</th>
                                <th scope="col" className="px-4 py-2">Phone</th>
                                {/* <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF]">Payment Methods</th> */}
                            </tr>
                        </thead>
                        {users.map((user, index) => (
                            <tbody>
                                <tr className="border-y-2 border-[#E4E6EF] bg-white ">
                                    <td className="whitespace-nowrap px-4 py-2 flex gap-4">
                                        <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" 
                                        onChange={handleClick}
                                        onClick={() => route = `/customers/customer_info?id=${user._id_customer}`}/>
                                        {user._name} {user._surname}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{user._email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-[#889DB9]">{user._phone_number}</td>
                                    {/* <td className="whitespace-nowrap border-2 border-[#E4E6EF] px-4 py-2">{userPayement.find(payment => payment._id_client === user._id_employee)?._payment_method}</td> */}
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </main>
        </Layout>
    );
}
