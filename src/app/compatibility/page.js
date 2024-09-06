"use client";

import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { useState } from "react";
import axios from 'axios';

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

    const handleSelectionChange1 = (ids) => {
        const id = ids[0];
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            const data = response.data[0];
            setFirstAstro(data['_astrological_sign']);
            setFirstDate(data['_birth_date']);
            setFirstName(data['_name']);
            setFirstSurname(data['_surname']);
        });
    };

    const handleSelectionChange2 = (ids) => {
        const id = ids[0];
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            const data = response.data[0];
            setSecondAstro(data['_astrological_sign']);
            setSecondDate(data['_birth_date']);
            setSecondName(data['_name']);
            setSecondSurname(data['_surname']);
        });
    };

    const calculateCompatibility = () =>
    {
        if (!firstDate || !secondDate) {
            console.log("customers are not correctly selected");
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
            <div className="m-10">
                <div className="h-full w-full pt-12 mx-10">
                        <div className="mb-4">
                            <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                                Astrological Compatibility
                            </h1>
                        </div>
                        <div className="w-full h-0.5 bg-black mb-4 mt-2"/>

                    <div className="pt-4">
                        <div className="flex flex-row justify-between items-start">
                            <div className="w-full">
                                <Dropdown onSelectionChange={handleSelectionChange1} />
                                <p className="mt-4 border-2 border-black p-2">
                                    {firstName ? `${firstName}` : ""} {firstSurname ? `${firstSurname}` : ""}
                                </p>
                                <p className="mt-4 border-2 border-black p-2">
                                    {firstAstro ? `${firstAstro}` : ""}
                                </p>
                            </div>

                            <div className="w-28"></div>

                            <div className="w-full">
                                <Dropdown onSelectionChange={handleSelectionChange2} />
                                <p className="mt-4 border-2 border-black p-2">
                                    {secondName ? `${secondName}` : ""} {secondSurname ? `${secondSurname}` : ""}
                                </p>
                                <p className="mt-4 border-2 border-black p-2">
                                    {secondAstro ? `${secondAstro}` : ""}
                                </p>
                            </div>
                        </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
