"use client"

import { Employee } from "@/models/Employee";

const { default: axios } = require("axios");
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function EmployeeForm
({
    name:existingName,
    email:existingEmail,
}) {
    const [name, setName] = useState(existingName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [goToEmployees, setGoToEmployees] = useState(false);
    const router = useRouter();

    const SaveEmployee = async (event) => {
        event.preventDefault();
        const data = {name, email};

        try {
            axios.post('/api/employee/create', data);
        } catch (error) {
            console.error('Failed to save product:', error);
        }
        setGoToEmployees(true);
    };

    useEffect(() => {
        if (goToEmployees) {
            router.push('/test');
        }
    }, [goToEmployees, router]);

    return (
        <div className="m-10">
            <form onSubmit={SaveEmployee}>
                <label>Name</label>
                <textarea
                    placeholder="name"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Email</label>
                <input
                    placeholder="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <button type="submit" className="mt-2 bg-[#2D84B9] text-white px-4 py-1">Save</button>
            </form>
        </div>
    );
}