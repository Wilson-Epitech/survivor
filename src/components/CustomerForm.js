"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function CustomerForm
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
    const [_description, setDescription] = useState('');
    const [_astrological_sign, setAstrologicalSign] = useState('');
    const [_phone_number, setPhoneNumber] = useState('');
    const [_address, setAddress] = useState('');
    const [_image, setImage] = useState(null);
    const [goToCustomer, setGoToCustomer] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const router = useRouter();

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", _image);

        try {
            const response = await axios.post('/api/customers/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setGoToCustomer(true);
            return response.data;
        } catch (error) {
            console.error('Failed to upload image:', error);
            return null;
        }
    };

    const SaveCustomer = async (event) =>
    {
        event.preventDefault();
        let image_link = '';
        const emptyLastConnexion = "";

        if (!_gender || !_image || !_email || !_name || !_surname || !_birth_date || !_description || !_astrological_sign || !_phone_number) {
            setErrorMessage(true);
            return
        }

        if (_image) {
            image_link = await uploadImage();
        }

        event.preventDefault();
        const data = {_email, _name, _surname, _birth_date, _gender, _description, _astrological_sign, _phone_number, _address, _image: image_link, _last_connexion: emptyLastConnexion};

        try {
            axios.post('/api/customers/create', data);
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };

    useEffect(() => {
        if (goToCustomer) {
            router.push('/customers');
        }
    }, [goToCustomer, router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <div className="flex min-h-full flex-col justify-center px-24 py-12 lg:px-12 rounded-md shadow-2xl bg-white sm:max-w-lg">
                <form className="space-y-6" onSubmit={SaveCustomer}>
                    <div className="mb-4">
                        <h2 className="mt-2 mb-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Create new customer
                        </h2>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="name" className="block text-mb font-medium leading-6 text-gray-900">Name</label>
                        <input name="name" type="name" autoComplete="name" required value={_name} onChange={ev => setName(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="surname" className="block text-mb font-medium leading-6 text-gray-900">Surname</label>
                        <input name="surname" type="surname" autoComplete="surname" required value={_surname} onChange={ev => setSurname(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className="block text-mb font-medium leading-6 text-gray-900">Email</label>
                        <input  name="email" type="email" autoComplete="email" required value={_email} onChange={ev => setEmail(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="phone" className="block text-mb font-medium leading-6 text-gray-900">Phone Number</label>
                        <input name="phone" type="phone" autoComplete="phone" required value={_phone_number} onChange={ev => setPhoneNumber(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="adress" className="block text-mb font-medium leading-6 text-gray-900">Adress</label>
                        <input name="adress" type="adress" autoComplete="adress" required value={_address} onChange={ev => setAddress(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="birthdate" className="block text-mb font-medium leading-6 text-gray-900">Birth Date</label>
                        <input name="birthdate" type="date" autoComplete="birthdate" required value={_birth_date} onChange={ev => setDate(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="description" className="block text-mb font-medium leading-6 text-gray-900">Description</label>
                        <input name="wdescriptionork" type="description" autoComplete="description" required value={_description} onChange={ev => setDescription(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="astro" className="block text-mb font-medium leading-6 text-gray-900">Astrological Sign</label>
                        <input name="astro" type="astro" autoComplete="astro" required value={_astrological_sign} onChange={ev => setAstrologicalSign(ev.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-[#2E84B9] sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="flex gap-2 mb-2">
                            <input
                            type="radio"
                            value="Male"
                            name="gender"
                            onChange={(ev) => setGender(ev.target.checked ? "Male" : "")}
                            className="accent-[#FF86D8] border-2 border-gray-300 rounded-md px-2 py-2"
                        />
                        <label htmlFor="male">Male</label>

                        <input
                            type="radio"
                            value="Female"
                            name="gender"
                            onChange={(ev) => setGender(ev.target.checked ? "Female" : "")}
                            className="accent-[#FF86D8] border-2 border-gray-300 rounded-md px-2 py-2"
                        />
                        <label htmlFor="female">Female</label>
                    </div>

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
                    <div className="mt-8">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-[#ff86d7] hover:bg-[#ffbae8]  px-4 py-2 text-mb font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
