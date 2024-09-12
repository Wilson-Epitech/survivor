"use client";

import { useRouter, redirect } from 'next/navigation';
import { Suspense, useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import UnauthorizedPopup from "@/components/UnauthorizedPopup"
import { useSearchParams } from 'next/navigation';

function CustomerSearchParams({ setSearch }) {
    const searchParams = useSearchParams();
    const customerIdFromURL = parseInt(searchParams.get('id'));

    useEffect(() => {
        if (customerIdFromURL) {
            setSearch(customerIdFromURL);
        }
    }, [customerIdFromURL, setSearch]);

    return null;
}

export default function Home()
{
    const [coachCustomersId, setCoachCustomersId] = useState([]);
    const [employeeRole, setEmployeeRole] = useState(0);
    const [employeeID, setEmployeeID] = useState(0);
    const [users, setUsers] = useState([]);
    const [tmpUsers, setTmpUsers] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const [userPhoto, setUserPhoto] = useState([]);
    const [userPayement, setUserPayement] = useState([]);
    const [userDate, setUserDate] = useState([]);
    const [coach, setCoach] = useState([]);
    const [search, setSearch] = useState(0);
    const [unauthorized, setUnauthorized] = useState(undefined);

    const route = useRouter();

    useEffect(() => {
        axios.get('/api/customers').then(response => {
            setTmpUsers(response.data);
        }).catch(err => {console.error(err)});
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
        if (!employeeRole || !employeeID)
            return;
        if (employeeRole !== "Coach") {
            setUsers(tmpUsers);
            setUnauthorized(false);
            return;
        }
        let tmpCustomersId = [];
        tmpUsers.forEach((user) => {
            if (user._coach === employeeID)
                tmpCustomersId.push(user._id_customer);
        });
        setCoachCustomersId(tmpCustomersId);
    }, [tmpUsers, employeeRole, employeeID]);

    useEffect(() => {
        if (coachCustomersId.length === 0) {
            return;
        }
        for (let i = 0; i < coachCustomersId.length; i++) {
            if (search === coachCustomersId[i]) {
                setUsers(tmpUsers);
                setUnauthorized(false);
                return;
            }
        }
        setUnauthorized(true);
    }, [coachCustomersId, search, tmpUsers]);

    useEffect(() => {
        if (users.length === 0 || search === 0)
            return;
        axios.get('/api/customers/customer_address').then(response => {
            setUserAddress(response.data);
        }).catch(err => {console.error(err)});

        if (search) {
            axios.get(`/api/customers/customer_photo?id=${search}`).then(response => {
                setUserPhoto(response.data);
            }).catch(err => {console.error(err)});
            axios.get(`/api/orders?id=${search}`).then(response => {
                setUserPayement(response.data);
            }).catch(err => {console.error(err)});
            axios.get(`/api/encounters/get_encounter_clientpage?id=${search}`).then(response => {
                setUserDate(response.data);
            }).catch(err => {console.error(err)});
            axios.get(`/api/employee/getEmployeeById?id=${users.find(user => user._id_customer === search)?._coach}`).then(response => {
                setCoach(response.data);
            }).catch(err => {console.error(err)});
        }
    }, [users, search]);

    useEffect(() => {
        if (tmpUsers.length === 0)
            return;
        for (let i = 0; i < tmpUsers.length; i++) {
            if (search === tmpUsers[i]._id_customer)
                return;
        }
        setUnauthorized(true);
    }, [tmpUsers, search]);


    let img = userPhoto.length > 0 ? userPhoto[0]._image : null

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <CustomerSearchParams setSearch={setSearch} />
            </Suspense>
            {unauthorized === undefined ? null :
            (unauthorized === true ?
                <UnauthorizedPopup link={"/customers"} pageToRedirect={"customers"}/> :
            (<main className="w-full h-full min-h-screen px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4 flex flx-row gap-4">
                    <h1 className="mt-2 mb-4 text-left text-4xl font-bold leading-9 tracking-tight w-1/2 text-gray-900">
                        Customer Details
                    </h1>
                    <div className="w-full flex justify-end items-stretch py-2">
                        <button onClick={() => route.back() } >
                            <div className="flex flex-row self-center rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2 gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>

                                <p>Back</p>
                            </div>
                        </button>

                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">


                    <div className="w-full lg:w-1/4 flex flex-col gap-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 ">
                        <div className="w-full ">
                            <div className="w-full flex justify-center">
                                {img ? (
                                    <img className="object-contain w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full" src={`data:image/jpeg;base64,${img}`} alt="Customer Photo" />
                                ) : (
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="w-full mb-4 flex justify-center">
                                <p className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 ">
                                    {users.find(user => user._id_customer === search)?._name} {users.find(user => user._id_customer === search)?._surname}
                                </p>
                            </div>
                            <div className="h-1/6 w-full rounded-sm border-y-2 border-[#E4E6EF] bg-white py-2 px-2"></div>
                            <div className="flex flex-row h-1/4 w-full rounded-sm border-b-2 border-[#E4E6EF] justify-center items-center bg-white py-2 px-2 ml-auto text-center">
                                <div className="w-full pb-4 pt-4 flex flex-col">
                                    <p className="text-lg text-[#2D425C]">
                                        {userDate.length}
                                    </p>
                                    <p className="text-base text-[#8B9FB7]">
                                        Total Encounters
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full rounded-sm bg-white py-4 px-4">
                                <p className="text-[#8B9FB7] font-bold text-sm">SHORT DETAILS</p>
                                <div className="w-full pb-4 pt-4 flex flex-col">
                                    <p className="text-sm text-[#8B9FB7]">
                                        User ID:
                                    </p>
                                    <p className="text-sm text-[#2D425C]">
                                        {search}
                                    </p>
                                </div>
                                <div className="w-full pb-4 flex flex-col">
                                    <p className="text-sm text-[#8B9FB7]">
                                        Email:
                                    </p>
                                    <p className="text-sm text-[#2D425C]">
                                        {users.find(user => user._id_customer === search)?._email}
                                    </p>
                                </div>
                                <div className="w-full pb-4 flex flex-col">
                                    <p className="text-sm text-[#8B9FB7]">
                                        Address:
                                    </p>
                                    <p className="text-sm text-[#2D425C]">
                                        {userAddress.find(user => user._id_customer === search)?._address}
                                    </p>
                                </div>
                                <div className="w-full pb-4 flex flex-col">
                                    <p className="text-sm text-[#8B9FB7]">
                                        Coach:
                                    </p>
                                    {coach.map(user => (
                                        <p className="text-sm text-[#2D425C]">
                                            {user._name} {user._surname}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2 ">
                        <div className="w-full px-2 sm:px-4 lg:px-2">
                            <div className="py-2">
                                <h2 className="font-bold text-xl sm:text-2xl lg:text-2xl mb-4">Recent Meetings</h2>
                                <div className="overflow-x-auto max-h-56 overflow-auto">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="bg-white text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Date</th>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Rating</th>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Report</th>
                                                <th scope="col" className="px-4 py-2 whitespace-nowrap border-2 border-[#E4E6EF]">Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userDate.map((meeting) => (
                                                <tr key={meeting._id} className="bg-white border-b border-[#E4E6EF]">
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF] text-pink-500 font-bold">{meeting._date}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF]">{meeting._rating}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF] text-[#8B9FB7]">{meeting._comment}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF]">{meeting._source}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-2 sm:px-4 lg:px-2">
                            <div className="py-2">
                                <h2 className="font-bold text-xl sm:text-2xl lg:text-2xl mb-4">Payments history</h2>
                                <div className="overflow-x-auto max-h-56 overflow-auto">
                                    <table className="min-w-full text-left text-sm font-light">
                                    <thead className="bg-white text-[#8B9FB7]">
                                            <tr>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Date</th>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Payment Method</th>
                                                <th scope="col" className="px-4 py-2 border-2 border-[#E4E6EF] whitespace-nowrap">Amount</th>
                                                <th scope="col" className="px-4 py-2 whitespace-nowrap border-2 border-[#E4E6EF]">Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userPayement.map((payment) => (
                                                <tr key={payment._id} className="bg-white border-b border-[#E4E6EF]">
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF] text-pink-500 font-bold">{payment._date}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF]">{payment._payment_method}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF] font-bold">{payment._amount}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 border-2 border-[#E4E6EF] text-[#8B9FB7]">{payment._comment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>))}
        </Layout>
    );
}