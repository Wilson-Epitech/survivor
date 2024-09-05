"use client";

import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function get_hat_cap(clothes) {
    let all_hat;
    for (let index = 0; index < clothes.length; index++) {
        if (clothes.at(index)._type === "hat/cap") {
            all_hat.push(clothes.at(index)._type);
        }
    }
    console.log(all_hat);
    return all_hat;
}

export default function Home() {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
        console.log("Selected Customer IDs:", ids);
    };

    const [clothes, setClothes] = useState([]);
    let all_hat;

    useEffect(() => {
        const lastSelectedId = selectedCustomerIds.at(selectedCustomerIds.length - 1);
        for (; clothes.length > 0;) {
            clothes.pop();
        }
        const lastId = selectedCustomerIds.at(selectedCustomerIds.length - 1);
        for (; selectedCustomerIds.length > 0;) {
            selectedCustomerIds.pop();
        }
        selectedCustomerIds.push(lastId);
        console.log(clothes.length);
        if (lastSelectedId) {
            axios.get(`/api/customers_clothe?id=${lastSelectedId}`).then(response => {
                setClothes(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
        }
        for (let index = 0; index < clothes.length; index++) {
            if (clothes.at(index)._type === "hat/cap") {
                all_hat.push(clothes.at(index)._type);
            }
        }
        console.log(clothes._type);
    }, [selectedCustomerIds]);

    // console.log(selectedCustomerIds.at(selectedCustomerIds.length - 1));

    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center justify-center bg-white">
                <div className="h-4/6 pt-11 mx-10 mt-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Wardrobe
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"></div>
                    <div className="flex justify-center">
                        <Dropdown onSelectionChange={handleSelectionChange}/>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>
                    {clothes.map(user => (
                        <p className="pr-1" key={user._type}>{user._type ? user._type : "vide"}</p>
                    ))}
                    <div className="w-full grid grid-col gap-6">
                        {/* hat/cap */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            <img
                                src="https://media2.chapellerie-traclet.com/40180-thickbox_default/chapeau-fedora-feutre-laine-noir-impermeable-traclet.jpg"
                                className="object-contain w-full h-36"
                            />
                            <button className="mb-2 w-full h-full grid justify-items-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* top */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            <img
                                src="https://i.ebayimg.com/images/g/4IsAAOSwpddgqEwp/s-l1200.jpg"
                                className="object-contain w-full h-36"
                            />
                            <button className="mb-2 w-full h-full grid justify-items-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* bottom */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            <img
                                src="https://media.wuerth.com/stmedia/modyf/eshop/products/std.lang.all/resolutions/normal/png-546x410px/1370911.png"
                                className="object-contain w-full h-36"
                            />
                            <button className="mb-2 w-full h-full grid justify-items-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* shoes */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            <img
                                src="https://m.media-amazon.com/images/I/61o8lAesIEL._AC_UY900_.jpg"
                                className="object-contain w-full h-36"
                            />
                            <button className="mb-2 w-full h-full grid justify-items-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
