"use client";
import Layout from "@/components/Layout";

import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/tips').then(response => {
            console.log(response.data);
            setUsers(response.data);
        }).catch(err => {console.error(err)});
    }, []);
    return (
        <Layout>
            <main className="w-full h-screen bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4">
                    <h1 className="mt-2 mb-4 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
                        Tips for Coaches
                    </h1>
                </div>
                <div className="w-full h-[95%] overflow-auto pt-8 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                    <div className="grid grid-cols-1 gap-4 w-full pr-2">
                        {users.map(user => (
                            <div className="border-2 border-[#E4E6EF] min-w-full max-w-max h-28 overflow-auto">
                                <h1 className="font-bold ml-2" key={user._title}>
                                {user._title ? user._title : "vide"}
                                </h1>
                                <p className="ml-2 mt-2" key={user._tip}> {user._tip ? user._tip : "vide"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
