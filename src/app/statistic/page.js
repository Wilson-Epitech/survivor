"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";

export default function Home()
{
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