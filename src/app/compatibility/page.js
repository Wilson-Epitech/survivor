"use client"

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Page()
{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/employee').then(response => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    return (
        <Layout>
            <div className="m-10">
                <div className="h-full w-full pt-12 mx-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Compatibility
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"/>
                        <div className="m-10">
                            {users.map(user => (
                                <div className="flex flex-row p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-1 mt-0.5">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                    </svg>
                                    <p className="pr-1" key={user._name}>{user._name ? user._name : "vide"}</p>
                                    <p key={user._surname}>{user._surname ? user._surname : "vide"}</p>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </Layout>
    )
}
