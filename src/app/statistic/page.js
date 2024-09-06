"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Layout from "@/components/Layout";
import { BarChart } from '@mui/x-charts/BarChart';

export function SimpleBarChart() {
  const Nb_Customer = [15, 30, 30, 15, 10];
  const xLabels = [
    '18-25',
    '25-33',
    '33-45',
    '45-60',
    '60-80'
  ];

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: Nb_Customer, label: 'Number of Customer', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}

export default function Home() {
    const [numberRating, setRating] = useState([]);
    const [numberCoach, setCoachNb] = useState(0);
    const [numberCustomer, setCustoNb] = useState(0);
    const [nbMenVsWomen, setGenderDisp] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/count_coachs').then(response => {
            setCoachNb(response.data);
        });
        axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
            setCustoNb(response.data);
        });
        axios.get('http://localhost:3000/api/customers/count_customers_by_gender').then(response => {
            setGenderDisp(response.data);
        });
        axios.get('http://localhost:3000/api/encounters/count_encounters').then(response => {
            console.log("nb of encounters:" + response.data);
        });
        axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
            setRating(response.data);
        });
    }, []);

    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center justify-items-stretch bg-white">
                <div className="h-full flex-row pt-7 mx-10 mb-48">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Statistics
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4"></div>

                    <div className="flex justify-between items-start">
                        <div className="justify-between"><h2 className="ml-20">Encounters' rating</h2></div>
                        <div className="justify-between"><h2 className="mr-0">Coaches Vs Customers</h2></div>
                        <div className="justify-between"><h2 className="mr-20">Women vs Men</h2></div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div className="ml-10 mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: numberRating[0], label: '1 Star' },
                                            { id: 1, value: numberRating[1], label: '2 Star' },
                                            { id: 3, value: numberRating[2], label: '3 Star' },
                                            { id: 4, value: numberRating[3], label: '4 Star' },
                                            { id: 5, value: numberRating[4], label: '5 Star' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>

                        <div className="mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: numberCoach, label: 'Coaches' },
                                            { id: 1, value: numberCustomer, label: 'Customer' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>

                        <div className="mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: nbMenVsWomen[1], label: 'Women' },
                                            { id: 1, value: nbMenVsWomen[0], label: 'Men' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                        <SimpleBarChart />
                    </div>
                </div>
            </main>
        </Layout>
    );
}
