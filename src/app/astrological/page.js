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
    };

    const calculateCompatibility = () =>
    {
        setErrorClient(null);
        setErrorMessage(null);
        if (clientA === clientB) {
            setErrorClient("You can't choose the same client");
            return
        }
        if (!isClientASelected || !isClientBSelected || !firstDate || !secondDate) {
            setErrorMessage("Clients are not correctly selected");
            return;
        }
        const firstMonth = parseInt(firstDate.split("-")[1], 10);
        const secondMonth = parseInt(secondDate.split("-")[1], 10);
        const sumMonths = firstMonth + secondMonth;
        const compatibilityPercentage = Math.round((sumMonths / 24) * 100);

        setCompatibility(compatibilityPercentage);
        setShowCompatibility(true);
    };

    return (
        <Layout>
            <div className="w-full flex-col items-center justify-center bg-white">
                <div className="min-w-max  pt-11 mx-10 mt-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Astrological
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"/>
                </div>

                <div className="m-10 max-w-[500px]">
                        <div className="pt-4">
                            <div className="flex flex-row justify-between items-start">
                                <div className="w-full flex flex-col items-center text-center">
                                    <Dropdown onSelectionChange={handleSelectionChange1} label="Client A"/>
                                        {isClientASelected ? (
                                            <>
                                                <p className="mt-4 border-2 border-black p-2">
                                                    {firstName} {firstSurname}
                                                </p>
                                                <p className="mt-4 border-2 border-black p-2">
                                                    {firstAstro}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="mt-4 border-2 border-black p-2">
                                                    {""}
                                                </p>
                                                <p className="mt-4 border-2 border-black p-2">
                                                    {""}
                                                </p>
                                            </>
                                        )}
                                </div>

                                <div className="pt-[5.4rem] flex items-center justify-center w-full">
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faArrowsAltH}/>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-center text-center">
                                    <Dropdown onSelectionChange={handleSelectionChange2} label="Client B"/>
                                    {isClientBSelected ? (
                                        <>
                                            <p className="mt-4 border-2 border-black p-2">
                                                {secondName} {secondSurname}
                                            </p>
                                            <p className="mt-4 border-2 border-black p-2">
                                                {secondAstro}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                        <p className="mt-4 border-2 border-black p-2">
                                            {""}
                                        </p>
                                        <p className="mt-4 border-2 border-black p-2">
                                            {""}
                                        </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {errorMessage && (
                                <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                            )}
                            {errorClient && (
                                <p className="mt-4 text-red-600 text-center">{errorClient}</p>
                            )}

                            <div className="mt-6 flex flex-col items-center">
                                {showCompatibility && (
                                        <p className="mt-4 mb-4 text-xl font-bold">
                                            {compatibility}%
                                        </p>
                                )}
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#2D84B9] text-white items-center"
                                    onClick={calculateCompatibility}
                                >
                                    Submit
                                </button>
                                {showCompatibility && (
                                    <img
                                        aria-hidden="true"
                                        src="/coeur.png"
                                        className="mt-10 select-none hidden size-36 xl:block -left-32 top-1/3"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
            </div>
        </Layout>
    );
}
