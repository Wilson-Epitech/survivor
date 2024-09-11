"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function EmployeeForm
({
    id:existingId,
    name:existingName,
    email:existingEmail,
    surname:existingSurname,
    birth_date:existingDate,
    gender:existingGender,
    work:existingWork,
    image:existingImage,
}) {

    const [_name, setName] = useState(existingName || '');
    const [_email, setEmail] = useState(existingEmail || '');
    const [_surname, setSurname] = useState(existingSurname || '');
    const [_birth_date, setDate] = useState(existingDate || '');
    const [_gender, setGender] = useState(existingGender || '');
    const [_work, setWork] = useState(existingWork || '');
    const [_image, setImage] = useState(null);
    const [goToEmployees, setGoToEmployees] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const router = useRouter();

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", _image);

        try {
            const response = await axios.post('/api/employee/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setGoToEmployees(true);
            return response.data;
        } catch (error) {
            console.error('Failed to upload image:', error);
            return null;
        }
    };

    const SaveEmployee = async (event) =>
    {
        event.preventDefault();
        let image_link = '';
        const emptyLastConnexion = "";

        if (!_gender || !_image || !_email || !_name || !_surname || !_birth_date || !_work) {
            setErrorMessage(true);
            return
        }

        if (_image) {
            image_link = await uploadImage();
        }

        event.preventDefault();
        const data = {_email, _name, _surname, _birth_date, _gender, _work, _image: image_link, _last_connexion: emptyLastConnexion};

        try {
            axios.post('/api/employee/create', data);
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };

    useEffect(() => {
        if (goToEmployees) {
            router.push('/coaches');
        }
    }, [goToEmployees, router]);

    return (
        <div className="m-10">
            <form className="absolute left-1/3 max-w-screen-sm translate-x-12" onSubmit={SaveEmployee}>
                <label>Name</label>
                <textarea
                    placeholder="name"
                    value={_name}
                    onChange={ev => setName(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                    required
                />
                <label>Surname</label>
                <textarea
                    placeholder="surname"
                    value={_surname}
                    onChange={ev => setSurname(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 w-full"
                    required
                />
                <label>Email</label>
                <input
                    placeholder="email"
                    value={_email}
                    onChange={ev => setEmail(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 py-2 w-full"
                    required
                />
                <label>Birth Date</label>
                <input
                    type='date'
                    placeholder="birth date"
                    value={_birth_date}
                    onChange={ev => setDate(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 py-2 w-full"
                    required
                />
                <label>Gender</label>
                <div className='flex gap-2'>
                    <input
                        type="radio"
                        value="Male"
                        name="gender"
                        onChange={(ev) => setGender(ev.target.checked ? "Male" : "")}
                        className="border-2 border-gray-300 rounded-md px-2 py-2"
                    />
                    <label htmlFor="male">Male</label>

                    <input
                        type="radio"
                        value="Female"
                        name="gender"
                        onChange={(ev) => setGender(ev.target.checked ? "Female" : "")}
                        className="border-2 border-gray-300 rounded-md px-2 py-2"
                    />
                    <label htmlFor="female">Female</label>
                </div>
                <label>Work</label>
                <input
                    placeholder="work"
                    value={_work}
                    onChange={ev => setWork(ev.target.value)}
                    className="border-2 border-gray-300 rounded-md px-1 py-2 w-full"
                    required
                />
                <div className="mb-2 flex flex-wrap gap-2">
                    <label className="w-24 h-24 mt-2 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input
                            type="file"
                            onChange={ev => setImage(ev.target.files[0])}
                            className='hidden'
                            accept="image/*"
                            multiple={false}>
                        </input>
                    </label>
                    {_image && (
                            <div>
                                <div className='h-24'>
                                    <img
                                        className='maw-w-24 max-h-24 mt-2'
                                        src={URL.createObjectURL(_image)}
                                    />
                                </div>
                            </div>
                        )}
                </div>
                {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">The fields were incorrectly filled</p>
                )}
                <button type="submit" className="mt-2 bg-[#2D84B9] hover:bg-[#5197c3] text-white px-4 py-1">Save</button>
            </form>
        </div>
    );
}
