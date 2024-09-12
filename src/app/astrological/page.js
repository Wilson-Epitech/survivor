"use client";

import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { set } from "mongoose";

export default function Home() {
    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);
    const [firstAstro, setFirstAstro] = useState([]);
    const [secondAstro, setSecondAstro] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [firstSurname, setFirstSurname] = useState([]);
    const [secondName, setSecondName] = useState([]);
    const [secondSurname, setSecondSurname] = useState([]);
    const [compatibility, setCompatibility] = useState([]);
    const [showCompatibility, setShowCompatibility] = useState(false);
    const [isClientASelected, setIsClientASelected] = useState(true);
    const [isClientBSelected, setIsClientBSelected] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorClient, setErrorClient] = useState(null);
    const [clientA, setClientA] = useState(null);
    const [clientB, setClientB] = useState(null);
    const [userPhotoClientA, setUserPhotoClientA] = useState([]);
    const [userPhotoClientB, setUserPhotoClientB] = useState([]);
    const router = useRouter();

    const handleSelectionChange1 = (ids) => {
        const id = ids[0];
        setClientA(id);
        if (!id) {
            setIsClientASelected(false);
            return;
        }
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            const data = response.data[0];
            setFirstAstro(data['_astrological_sign']);
            setFirstDate(data['_birth_date']);
            setFirstName(data['_name']);
            setFirstSurname(data['_surname']);
            setIsClientASelected(true);
        }).catch(err => {console.error(err)});
        axios.get(`/api/customers/customer_photo?id=${id}`).then(response => {
            setUserPhotoClientA(response.data);
        }).catch(err => {console.error(err)});
    };

    const handleSelectionChange2 = (ids) => {
        const id = ids[0];
        setClientB(id);
        if (!id) {
            setIsClientBSelected(false);
            return;
        }
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            const data = response.data[0];
            setSecondAstro(data['_astrological_sign']);
            setSecondDate(data['_birth_date']);
            setSecondName(data['_name']);
            setSecondSurname(data['_surname']);
            setIsClientBSelected(true);
        }).catch(err => {console.error(err)});
        axios.get(`/api/customers/customer_photo?id=${id}`).then(response => {
            setUserPhotoClientB(response.data);
        }).catch(err => {console.error(err)});
    };

    const calculateCompatibility = () =>
    {
        setErrorClient(null);
        setErrorMessage(null);
        if (clientA === clientB) {
            setErrorClient("Please select two different clients.");
            return
        }
        if (!isClientASelected || !isClientBSelected || !firstDate || !secondDate) {
            setErrorMessage("Please select two clients.");
            return;
        }
        const firstMonth = parseInt(firstDate.split("-")[1], 10);
        const secondMonth = parseInt(secondDate.split("-")[1], 10);
        const sumMonths = firstMonth + secondMonth;
        const compatibilityPercentage = Math.round((sumMonths / 24) * 100);

        setCompatibility(compatibilityPercentage);
        setShowCompatibility(true);
    };

    let imgClientA = userPhotoClientA.length > 0 ? userPhotoClientA[0]._image : null
    let imgClientB = userPhotoClientB.length > 0 ? userPhotoClientB[0]._image : null

    return (
        <Layout>
            <div className="w-full min-h-screen h-full bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4">
                    <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
                        Astrological
                    </h1>
                </div>
                <div className="pt-20">
                    {errorMessage && (
                        <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                    )}
                    {errorClient && (
                        <p className="mt-4 text-red-600 text-center">{errorClient}</p>
                    )}
                </div>
                <div className="h-fit w-full flex flex-row justify-center gap-4 pt-10">
                    <div className="max-w-[500px] w-full rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                        <div className="pt-4">
                            <div className="w-full flex flex-col items-center text-center">
                                <Dropdown onSelectionChange={handleSelectionChange1} label="Client A"/>
                                <div className="w-full h-full flex flex-col items-center">
                                    <div className="w-full flex justify-center pt-8">
                                        {imgClientA ? (
                                            <img className="object-contain w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full" src={`data:image/jpeg;base64,${imgClientA}`} alt="Customer Photo" />
                                        ) : (
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center rounded-full">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    {isClientASelected ? (
                                        <>
                                            <p className="mt-4 p-2 text-base sm:text-lg w-3/4 text-center ">
                                                {firstName} {firstSurname} <br/>
                                            </p>
                                            <p className="mt-4 p-2 text-base sm:text-lg w-3/4 text-center ">
                                                {firstAstro} <br/>
                                            </p>
                                        </>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[500px] w-full rounded-sm border-2 border-b-0 border-[#E4E6EF] content-center bg-white py-2 px-2">
                        <div className="mt-6 flex flex-col items-center">
                            {showCompatibility && (
                                <p className="mt-4 mb-4 text-xl font-bold">
                                    {compatibility}%
                                </p>
                            )}
                            <div className="relative">
                                <FontAwesomeIcon icon={faArrowsAltH} className="size-10"/>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#2D6EB8] hover:bg-[#4C7DB6] rounded-sm text-white items-center"
                                onClick={calculateCompatibility}
                            >
                                Submit
                            </button>
                        </div>
                    </div>


                    <div className="max-w-[500px] w-full rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                        <div className="pt-4">
                            <div className="flex flex-row justify-between items-start">

                                <div className="w-full flex flex-col items-center text-center">
                                    <Dropdown onSelectionChange={handleSelectionChange2} label="Client B"/>
                                    <div className="w-full flex justify-center pt-8">
                                        {imgClientB ? (
                                            <img className="object-contain w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full" src={`data:image/jpeg;base64,${imgClientB}`} alt="Customer Photo" />
                                        ) : (
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center rounded-full">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    {isClientBSelected ? (
                                        <>
                                            <p className="mt-4 p-2 text-base sm:text-lg w-3/4 text-center ">
                                                {secondName} {secondSurname}<br/>
                                            </p>
                                            <p className="mt-4 p-2 text-base sm:text-lg w-3/4 text-center ">
                                                {secondAstro}<br/>
                                            </p>
                                        </>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-full flex flex-row justify-center">
                    <div className="max-w-[500px] w-full rounded-sm border-2 border-t-0 border-[#E4E6EF] bg-white">
                        <div className="flex flex-col items-center">
                            {showCompatibility && (
                                <img
                                    aria-hidden="true"
                                    src="/coeur.png"
                                    className=" select-none size-36 xl:block -left-32 top-1/3"
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
