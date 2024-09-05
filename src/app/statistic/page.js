"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";

export default function Home()
{
        axios.get('http://localhost:3000/api/employee/count_coachs').then(response => {
            console.log("nb of coachs:" + response.data);
        })
        axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
            console.log("nb of customers:" + response.data);
        });
        axios.get('http://localhost:3000/api/customers/count_customers_by_gender').then(response => {
            console.log("nb of men:" + response.data[0]);
            console.log("nb of women:" + response.data[1]);
        });
        axios.get('http://localhost:3000/api/encounters/count_encounters').then(response => {
            console.log("nb of encounters:" + response.data);
        });
        axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
            console.log("nb of encounters 1:" + response.data[0]);
            console.log("nb of encounters 2:" + response.data[1]);
            console.log("nb of encounters 3:" + response.data[2]);
            console.log("nb of encounters 4:" + response.data[3]);
            console.log("nb of encounters 5:" + response.data[4]);
        });

    return (
        <Layout>
        <main className="min-h-screen w-fit flex-col items-center grid justify-items-stretch bg-white">
            <div className="h-4/6 flex-row pt-7 mx-10 mb-48">
                <div className="mb-4">
                    <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                        Statistics
                    </h1>
                </div>
                <div className="w-full h-0.5 bg-black mb-4"></div>
            </div>
        </main>
        </Layout>
    )
}