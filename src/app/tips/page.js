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
            <div className="mt-[4.5rem] w-full ml-4 mr-4">
                <div className="mb-[2.5rem]">
                    <h1 className="mt-2 text-4xl leading-9 tracking-tight text-[#2D425C] font-light">
                        Tips for Coaches
                    </h1>
                </div>
                <div className="w-full h-[95%] rounded-sm border mb-10">
                        {users.map((user, index) => (
                            <Disclosure key={index}>
                                {({ open }) => (
                                    <div className={`border-b border-[#DEE3ED] rounded-sm bg-white`}>
                                        <DisclosureButton className="w-full flex justify-between items-center p-3 text-left">
                                            <h1 className="font-semibold text-[#2D425C] text-sm">{user._title || ""}</h1>
                                            {open ? (
                                                <ChevronUpIcon className="w-3 h-3 text-[#2D425C]" />
                                            ) : (
                                                <ChevronDownIcon className="w-3 h-3 text-[#2D425C]" />
                                            )}
                                        </DisclosureButton>
                                        <DisclosurePanel className={`p-4 border-t transition-all duration-300 ${open ? 'block' : 'hidden'}`}>
                                            <p className="text-[13px] font-medium text-[#526889]">{user._tip || ""}</p>
                                        </DisclosurePanel>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                </div>
            </div>
        </Layout>
    );
}
