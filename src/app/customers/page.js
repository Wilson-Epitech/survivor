"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Dropdown from "@/components/DropdownCustomers";

export default function Home()
{
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
    };

    const [users, setUsers] = useState([]);
    const [userBirthdate, setUserBirthdate] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const [userPhoto, setUserPhoto] = useState([]);
    const [userPayement, setUserPayement] = useState([]);
    const [userDate, setUserDate] = useState([]);

    useEffect(() => {
        axios.get('/api/customers').then(response => {
            setUsers(response.data);
        }).catch(err => {console.error(err)});
        axios.get('/api/customers/customer_birth').then(response => {
            setUserBirthdate(response.data);
        }).catch(err => {console.error(err)});
        axios.get('/api/customers/customer_address').then(response => {
            setUserAddress(response.data);
        }).catch(err => {console.error(err)});

        const lastSelectedId = selectedCustomerIds.at(selectedCustomerIds.length - 1);
        const lastId = selectedCustomerIds.at(selectedCustomerIds.length - 1);

        while (selectedCustomerIds.length > 0) {
            selectedCustomerIds.pop();
        }
        selectedCustomerIds.push(lastId);

        if (lastSelectedId) {
            axios.get(`/api/customers/customer_photo?id=${lastSelectedId}`).then(response => {
                setUserPhoto(response.data);
            }).catch(err => {console.error(err)});
            axios.get(`/api/orders?id=${lastSelectedId}`).then(response => {
                setUserPayement(response.data);
            }).catch(err => {console.error(err)});
            axios.get(`/api/encounters/get_encounter_clientpage?id=${lastSelectedId}`).then(response => {
                setUserDate(response.data);
            }).catch(err => {console.error(err)});
    }}, [selectedCustomerIds]);

    let img = userPhoto.length > 0 ? userPhoto[0]._image : null

    return (
        <Layout>
            <main className="w-full bg-white px-4 py-5 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <h1 className="mt-2 mb-4 text-left text-3xl sm:text-4xl lg:text-5xl font-bold leading-9 tracking-tight text-gray-900">
                        Customers
                    </h1>
                </div>
                <div className="w-full h-px bg-black mb-4"></div>

                <div className="w-full flex flex-col lg:flex-row lg:items-start mb-6">
                    <div className="w-full lg:w-3/4 lg:pr-4">
                        <div className="w-full mb-4">
                            <Dropdown onSelectionChange={handleSelectionChange} label={users._name ? `Customer : ${users._name}` : "Customer : "} />
                        </div>
                        <div className="w-full mb-4 flex items-center">
                            <img className="w-6 h-6 mr-2 sm:w-7 sm:h-7" src="/Happy.ico" alt="Happy icon" />
                            <p className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900">
                                {users.find(user => user._id_customer === selectedCustomerIds.at(-1))?._name} {users.find(user => user._id_customer === selectedCustomerIds.at(-1))?._surname}
                            </p>
                        </div>
                        <div className="w-full mb-4 flex items-center">
                            <img className="w-6 h-6 mr-2 sm:w-7 sm:h-7" src="/Birth.ico" alt="Birth icon" />
                            <p className="text-base sm:text-lg lg:text-2xl text-gray-900">
                                {userBirthdate.find(user => user._id_customer === selectedCustomerIds.at(-1))?._birth_date}
                            </p>
                        </div>
                        <div className="w-full mb-4 flex items-center">
                            <img className="w-6 h-6 mr-2 sm:w-7 sm:h-7" src="/Location.ico" alt="Location icon" />
                            <p className="text-base sm:text-lg lg:text-2xl text-gray-900">
                                {userAddress.find(user => user._id_customer === selectedCustomerIds.at(-1))?._address}
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 flex justify-start lg:justify-end">
                        {img ? (
                            <img className="object-contain w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36" src={`data:image/jpeg;base64,${img}`} alt="Customer Photo" />
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full h-px bg-black mb-4"></div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-2">
                        <div className="py-2">
                            <h2 className="font-bold text-xl sm:text-2xl lg:text-2xl mb-4">Payments</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="bg-[#2C84B9] text-white">
                                        <tr>
                                            <th scope="col" className="px-4 py-2 border-2 border-black whitespace-nowrap">Date</th>
                                            <th scope="col" className="px-4 py-2 border-2 border-black whitespace-nowrap">Amount</th>
                                            <th scope="col" className="px-4 py-2 whitespace-nowrap border-2 border-black">Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userPayement.map((payment) => (
                                            <tr key={payment._id} className="bg-neutral-100 border-b border-black">
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{payment._date}</td>
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{payment._amount}</td>
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{payment._comment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-2">
                        <div className="py-2">
                            <h2 className="font-bold text-xl sm:text-2xl lg:text-2xl mb-4">Meetings</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="bg-[#2C84B9] text-white">
                                        <tr>
                                            <th scope="col" className="px-4 py-2 border-2 border-black whitespace-nowrap">Date</th>
                                            <th scope="col" className="px-4 py-2 border-2 border-black whitespace-nowrap">Rating</th>
                                            <th scope="col" className="px-4 py-2 border-2 border-black whitespace-nowrap">Report</th>
                                            <th scope="col" className="px-4 py-2 whitespace-nowrap border-2 border-black">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDate.map((meeting) => (
                                            <tr key={meeting._id} className="bg-neutral-100 border-b border-black">
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{meeting._date}</td>
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{meeting._rating}</td>
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{meeting._comment}</td>
                                                <td className="whitespace-nowrap px-4 py-2 border-2 border-black">{meeting._source}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
