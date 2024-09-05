"use client";

import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
    const [firstDate, setFirstDate] = useState([]);
    const [secondDate, setSecondDate] = useState([]);
    const [firstAstro, setFirstAstro] = useState([]);
    const [secondAstro, setSecondAstro] = useState([]);
    // const [selectedCustomerId2, setSelectedCustomerId2] = useState([]);

    const handleSelectionChange1 = (ids) => {
        // setSelectedCustomerId1(ids);
        console.log("Selected Customer IDs:", ids);
        const id = ids[0];
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            setFirstAstro(response.data[0]['_astrological_sign']);
            setFirstDate(response.data[0]['_birth_date']);
            console.log("date:", response.data[0]['_birth_date']);
            console.log("astro:", response.data[0]['_astrological_sign']);
        });
    };

    const handleSelectionChange2 = (ids) => {
        console.log("Selected Customer IDs:", ids);
        const id = ids[0];
        axios.get(`/api/customers/customer_astro?id=${id}`).then(response => {
            setSecondAstro(response.data[0]['_astrological_sign']);
            setSecondDate(response.data[0]['_birth_date']);
            console.log("date:", response.data[0]['_birth_date']);
            console.log("astro:", response.data[0]['_astrological_sign']);
        });
    };

    const calculateCompatibility = () => {
        if (!firstAstro || !secondAstro) {
            console.log("customer not picked");
            return;
        }

        const firstArray = firstDate.split("-");
        const secondArray = firstDate.split("-");
        // let firstMonth = parseInt(firstArray[1]);
        let firstMonth = parseInt("03");
        // let secondMonth = parseInt(secondArray[1]);
        let secondMonth = parseInt("04");
        console.log("first month here:", firstMonth);
        console.log("second month here:", secondMonth);
        const res = firstMonth + secondMonth;
        console.log("res ici: ", res);
    }

    useEffect(() => {
        console.log("ok ça fonctionne");

        // if (selectedCustomerId1) {
        //     console.log("selected!!!!");
        // }
        // const lastSelectedId1 = selectedCustomerId1.at(selectedCustomerId1.length - 1);
        // const lastId1 = selectedCustomerId1.at(selectedCustomerId1.length - 1);
        // for (; selectedCustomerId1.length > 0;) {
        //     selectedCustomerId1.pop();
        // }
        // console.log("aaaaaa");
        // selectedCustomerId1.push(lastId1);
        // axios.get('/api/customer_astro?id=${lastSelectedId1}').then(response => {
        //     console.log(response.data);
        // });


        // if (lastSelectedId1) {
        //     axios.get(`/api/customers_clothe?id=${lastSelectedId1}`).then(response => {
        //         setBirthDate(response.data);
        //         console.log(response.data);
        //     }).catch(error => {
        //         console.error("Failed to fetch birth date", error);
        //     });
        // }
    }, []);


    return (
        <Layout>
            <div className="m-10">
                <div className="h-full w-full pt-12 mx-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Astrological
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"/>

                <div className="flex flex-row grid-rows-3">

                    <div className="w-full h-12">
                        <Dropdown onSelectionChange={handleSelectionChange1} />
                    </div>

                    <div className="w-28"></div>

                    <div className="w-full h-12">
                        <Dropdown onSelectionChange={handleSelectionChange2} />
                    </div>

                    <p>{firstAstro}</p>
                    <p>{secondAstro}</p>


                    <button type="submit" className="" onClick={calculateCompatibility}>submit</button>
                </div>
                    {/* {selectedCustomerId1} */}
                    {/* {selectedCustomerId2} */}
                </div>
            </div>
        </Layout>
    )
}
