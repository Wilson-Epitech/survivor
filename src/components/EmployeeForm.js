"use client"

import axios from 'axios';
// const { default: axios } = require("axios");
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function EmployeeForm
({
    id:exisitingId,
    name:existingName,
    email:existingEmail,
    surname:existingSurname,
    birth_date:existingDate,
    gender:existingGender,
    work:existingWork,
    image:exisitingImage,
}) {

    // const [_id_employee, setIdEmployee] = useState(exisitingId || '');
    const [_name, setName] = useState(existingName || '');
    const [_email, setEmail] = useState(existingEmail || '');
    const [_surname, setSurname] = useState(existingSurname || '');
    const [_birth_date, setDate] = useState(existingDate || '');
    const [_gender, setGender] = useState(existingGender || '');
    const [_work, setWork] = useState(existingWork || '');
    const [_image, setImage] = useState(exisitingImage || '');
    const [goToEmployees, setGoToEmployees] = useState(false);
    const router = useRouter();

    const SaveEmployee = async (event) => {
        event.preventDefault();
        const data = {_email, _name, _surname, _birth_date, _gender, _work, _image};

        try {
            axios.post('/api/employee/create', data);
        } catch (error) {
            console.error('Failed to save product:', error);
        }
        setGoToEmployees(true);
    };

    useEffect(() => {
        if (goToEmployees) {
            router.push('/coaches');
        }
    }, [goToEmployees, router]);

    return (
        <div className="m-10">
            <form onSubmit={SaveEmployee}>
                <label>Name</label>
                <textarea
                    placeholder="name"
                    value={_name}
                    onChange={ev => setName(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Surname</label>
                <textarea
                    placeholder="surname"
                    value={_surname}
                    onChange={ev => setSurname(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Email</label>
                <input
                    placeholder="email"
                    value={_email}
                    onChange={ev => setEmail(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Birth Date</label>
                <input
                    placeholder="birth date"
                    value={_birth_date}
                    onChange={ev => setDate(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Gender</label>
                <input
                    placeholder="gender"
                    value={_gender}
                    onChange={ev => setGender(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Work</label>
                <input
                    placeholder="work"
                    value={_work}
                    onChange={ev => setWork(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <label>Image</label>
                <input
                    placeholder="image"
                    value={_image}
                    onChange={ev => setImage(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                />
                <button type="submit" className="mt-2 bg-[#2D84B9] text-white px-4 py-1">Save</button>
            </form>
        </div>
    );
}
