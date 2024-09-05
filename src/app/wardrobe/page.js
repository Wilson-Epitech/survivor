"use client";
import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [selectedHat = 0, setSelectedHat] = useState();
    const [selectedTop = 0, setSelectedTop] = useState();
    const [selectedBottom = 0, setSelectedBottom] = useState();
    const [selectedShoes = 0, setSelectedShoes] = useState();

    const handleSelectionChange = (ids) => {
        setSelectedCustomerIds(ids);
    };

    const [clothes, setClothes] = useState([]);
    const [clothes_img_hat, setClothes_img_hat] = useState([]);
    const [clothes_img_top, setClothes_img_top] = useState([]);
    const [clothes_img_bottom, setClothes_img_bottom] = useState([]);
    const [clothes_img_shoes, setClothes_img_shoes] = useState([]);

    let hat_img_id = [];
    let top_img_id = [];
    let bottom_img_id = [];
    let shoes_img_id = [];

    const handleChange = (setSelectedChange, selectedChange, nb) => {
        setSelectedChange(() => {
            const newSelectedShoes = selectedChange + nb;
            return newSelectedShoes;
        });
    };

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

        if (lastSelectedId) {
            axios.get(`/api/customers_clothe?id=${lastSelectedId}`).then(response => {
                setClothes(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
        }
    }, [selectedCustomerIds]);

    useEffect(() => {
        if (selectedHat) {
            axios.get(`/api/customers_clothe/image?id=${hat_img_id[selectedHat]}`).then(response => {
                setClothes_img_hat(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
            console.log("pass useEffect image")
        }
    }, [selectedHat]);

    useEffect(() => {
        if (selectedTop) {
            axios.get(`/api/customers_clothe/image?id=${top_img_id[selectedTop]}`).then(response => {
                setClothes_img_top(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
            console.log("pass useEffect image")
        }
    }, [selectedTop]);

    useEffect(() => {
        if (selectedBottom) {
            axios.get(`/api/customers_clothe/image?id=${bottom_img_id[selectedBottom]}`).then(response => {
                setClothes_img_bottom(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
            console.log("pass useEffect image")
        }
    }, [selectedBottom]);

    useEffect(() => {
        if (selectedShoes) {
            axios.get(`/api/customers_clothe/image?id=${shoes_img_id[selectedShoes]}`).then(response => {
                setClothes_img_shoes(response.data);
            }).catch(error => {
                console.error("Failed to fetch clothes", error);
            });
            console.log("pass useEffect image")
        }
    }, [selectedShoes]);

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

                    {clothes.forEach((car) => car._type === 'hat/cap' ? hat_img_id.push(car._id_clothes) : car._id_clothes)}
                    {clothes.forEach((car) => car._type === 'top' ? top_img_id.push(car._id_clothes) : car._id_clothes)}
                    {clothes.forEach((car) => car._type === 'bottom' ? bottom_img_id.push(car._id_clothes) : car._id_clothes)}
                    {clothes.forEach((car) => car._type === 'shoes' ? shoes_img_id.push(car._id_clothes) : car._id_clothes)}


                    <div className="w-full grid grid-col gap-6">
                        {/* hat/cap */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center" onClick={() => handleChange(setSelectedHat, selectedHat, -1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            {clothes_img_hat.map(user => (
                                <img className="object-contain w-full h-36" src={`data:image/jpeg;base64, ${user._image}`}/>
                            ))}
                            <button className="mb-2 w-full h-full grid justify-items-start items-center" onClick={() => handleChange(setSelectedHat, selectedHat, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* top */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center" onClick={() => handleChange(setSelectedTop, selectedTop, -1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            {clothes_img_top.map(user => (
                                <img className="object-contain w-full h-36" src={`data:image/jpeg;base64, ${user._image}`}/>
                            ))}
                            <button className="mb-2 w-full h-full grid justify-items-start items-center" onClick={() => handleChange(setSelectedTop, selectedTop, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* bottom */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center" onClick={() => handleChange(setSelectedBottom, selectedBottom, -1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            {clothes_img_bottom.map(user => (
                                <img className="object-contain w-full h-36" src={`data:image/jpeg;base64, ${user._image}`}/>
                            ))}
                            <button className="mb-2 w-full h-full grid justify-items-start items-center" onClick={() => handleChange(setSelectedBottom, selectedBottom, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        {/* shoes */}
                        <div className="flex flex-row items-center">
                            <button className="mb-2 w-full h-full grid justify-items-end items-center" onClick={() => handleChange(setSelectedShoes, selectedShoes, -1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            {clothes_img_shoes.map(user => (
                                <img className="object-contain w-full h-36" src={`data:image/jpeg;base64, ${user._image}`}/>
                            ))}
                            <button className="mb-2 w-full h-full grid justify-items-start items-center" onClick={() => handleChange(setSelectedShoes, selectedShoes, 1)}>
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
