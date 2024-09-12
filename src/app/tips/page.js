"use client";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/tips').then(response => {
            setUsers(response.data);
        }).catch(err => { console.error(err) });
    }, []);

    return (
        <Layout>
            {/* <main className="w-full h-screen bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16"> */}
            <div className="mt-20 w-full ml-4">
                <div className="mb-4">
                    <h1 className="mt-2 text-3xl leading-9 tracking-tight text-[#2D425C] font-normal">
                        Tips for Coaches
                    </h1>
                </div>
                <div className="w-full h-[95%] pt-8 rounded-sm bg-white py-2 pr-4">
                        {users.map((user, index) => (
                            <Disclosure key={index}>
                                {({ open }) => (
                                    <div className={`border-2 border-[#E4E6EF] rounded-sm bg-white`}>
                                        <DisclosureButton className="w-full flex justify-between items-center p-4 text-left">
                                            <h1 className="font-bold">{user._title || ""}</h1>
                                            {open ? (
                                                <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                                            ) : (
                                                <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                                            )}
                                        </DisclosureButton>
                                        <DisclosurePanel className={`p-4 transition-all duration-300 ${open ? 'block' : 'hidden'}`}>
                                            <p>{user._tip || ""}</p>
                                        </DisclosurePanel>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                </div>
            </div>
            {/* </main> */}
        </Layout>
    );
}
