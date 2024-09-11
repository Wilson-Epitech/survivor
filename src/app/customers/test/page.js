"use client"

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
        // <Layout>
            <div className="w-screen h-screen pl-4 bg-[#F5F6FA] gap-4">
                <div className="flex flex-col">
                    <h1 className="mt-8 text-left text-2xl sm:text-3xl lg:text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Customer Details
                    </h1>
                    <div className="w-full mb-4">
                            <Dropdown onSelectionChange={handleSelectionChange} label={users._name ? `Customer : ${users._name}` : "Customer : "} />
                        </div>

                    <div className="bg-white w-1/4 h-full flex flex-col mt-4">
                        <div className="w-full flex justify-center h-fit rounded-sm border-2 border-[#E4E6EF]">
                            <div className="w-full flex justify-center flex-col items-center pt-2 pb-2 gap-2">
                                {img ? (
                                    <img className="object-contain w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36" src={`data:image/jpeg;base64,${img}`} alt="Customer Photo" />
                                ) : (
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                                <p className="text-lg sm:text-xl lg:text-1xl font-bold flex justify-center text-gray-900 w-full">
                                    {users.find(user => user._id_customer === selectedCustomerIds.at(-1))?._name} {users.find(user => user._id_customer === selectedCustomerIds.at(-1))?._surname}
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex justify-center h-fit pt-2 pb-2 rounded-sm border-2 border-[#E4E6EF]">

                        </div>

                    </div>
                </div>

            </div>
        // </Layout>
    );
}
