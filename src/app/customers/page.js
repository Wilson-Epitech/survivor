"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
    const [tmpUsers, setTmpUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [employeeRole, setEmployeeRole] = useState(0);
    const [employeeID, setEmployeeID] = useState(0);
    const router = useRouter();
    const [showSearchbar, setShowSearchbar] = useState(false);
    let route;

    const handleClick = (e) => {
        e.preventDefault()
        router.prefetch(route, 20, 40)
        router.push(route)
    }

    useEffect(() => {
        axios.get('/api/customers')
            .then(response => setTmpUsers(response.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/role').then(response => {
            setEmployeeRole(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/id').then(response => {
            setEmployeeID(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    useEffect(() => {
        if (employeeRole && employeeID) {
            let assignedUsers = [];
            if (employeeRole === "Coach") {
                tmpUsers.forEach((user) => {
                    if (user._coach == employeeID)
                        assignedUsers.push(user);
                });
                setUsers(assignedUsers);
            } else {
                setUsers(tmpUsers);
            }
        }
    },[employeeRole, employeeID, tmpUsers]);

    const [inputValue, setInputValue] = useState('');
    const [firstInputValue, setFirstInputValue] = useState('');
    const [secondInputValue, setsecondInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
        let input = inputValue.split(" ");
        input.length > 1 ? (setFirstInputValue(input[0]), setsecondInputValue(input[1])) : (setFirstInputValue(event.target.value), setsecondInputValue(""))
    };

    return (
        <Layout>
            <main className="w-full min-h-screen h-full px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
                            Customers List
                        </h1>
                        <p className="text-[#889DB9] text-sm mb-2">You have total {users.length} customers.</p>
                    </div>
                    {!employeeRole || employeeRole === "Coach" ? null :
                    (<Link
                        href='/customers/create'
                        className="p-1.5 text-white bg-[#ff86d7] hover:bg-[#ffbae8] text-md rounded-[3px] flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </Link>)}
                </div>
                <div className="flex flex-col gap-6 w-full h-full overflow-x-auto rounded-sm bg-white border-2 border-[#E4E6EF]">

                    <div className={`h-10 w-full flex flex-row gap-4 py-4 px-4 ${showSearchbar ? "justify-center" : "justify-end"}`}>
                        {showSearchbar ?
                        <div className="w-full">
                            <input id="search_bar" name="search_bar" type="text" placeholder="Search a customer" value={inputValue} onChange={handleInputChange} className="block w-full rounded-md py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 sm:text-sm sm:leading-6"/>
                        </div> : ''
                        }
                        <div className="flex justify-center h-full pt-1.5">
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
                                <th scope="col" className="px-4 py-2 flex gap-4"><input type="checkbox" disabled /> Customer</th>
                                <th scope="col" className="px-4 py-2">Email</th>
                                <th scope="col" className="px-4 py-2">Phone</th>
                            </tr>
                        </thead>
                        {users.filter(
                            item => item._name.toLowerCase().includes(firstInputValue.toLowerCase()) && item._surname.toLowerCase().includes(secondInputValue.toLowerCase()) ||
                            item._name.toLowerCase().includes(secondInputValue.toLowerCase()) && item._surname.toLowerCase().includes(firstInputValue.toLowerCase())
                        ).map((user, index) => (
                            <tbody>
                                <tr className="border-y-2 border-[#E4E6EF] bg-white">
                                    <td className="whitespace-nowrap px-4 py-4 flex gap-4">
                                        <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded bg-[#ff86d7] focus:ring-pink-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" 
                                        onChange={handleClick}
                                        onClick={() => route = `/customers/customer_info?id=${user._id_customer}`}/>
                                        {user._name} {user._surname}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-[#889DB9]">{user._email}</td>
                                    <td className="whitespace-nowrap px-4 py-4 text-[#889DB9]">{user._phone_number}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </main>
        </Layout>
    );
}
