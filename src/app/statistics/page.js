"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import DropdownStatisticsCoachs from "@/components/DropdownCoachs"

const lastYear = [{year: "2023", month: "10"}, {year: "2023", month: "11"}, {year: "2023", month: "12"},
    {year: "2024", month: "01"}, {year: "2024", month: "02"}, {year: "2024", month: "03"},
    {year: "2024", month: "04"}, {year: "2024", month: "05"}, {year: "2024", month: "06"},
    {year: "2024", month: "07"}, {year: "2024", month: "08"}, {year: "2024", month: "09"},
]

function fillRatingStats(rating, ratingArray)
{
    ratingArray[rating - 1]++;
    return ratingArray;
}

function fillRatingYearStats(year, month, rating, yearArray)
{
    for (let i = 0; i < yearArray.length; i++) {
        if (year == lastYear[i].year && month == lastYear[i].month) {
            yearArray[i] = fillRatingStats(rating, yearArray[i]);
        }
    }
    return yearArray;
}

function fillYearStats(year, month, yearArray)
{
    for (let i = 0; i < yearArray.length; i++) {
        if (year == lastYear[i].year && month == lastYear[i].month) {
            yearArray[i]++;
        }
    }
    return yearArray;
}

export default function Home() {
    const [numberRating, setRating] = useState([]);
    const [numberCoach, setCoachNb] = useState(0);
    const [numberCustomer, setCustoNb] = useState(0);
    const [nbMenVsWomen, setGenderDisp] = useState([]);
    const [customerAge, setCustoAge] = useState([]);

    const xLabels = [
      '18-25',
      '26-33',
      '34-45',
      '46-60',
      '61-80'
    ];
    const yMonthes = [
        '10/23',
        '11/23',
        '12/23',
        '01/24',
        '02/24',
        '03/24',
        '04/24',
        '05/24',
        '06/24',
        '07/24',
        '08/24',
        '09/24',
    ];

    const [users, setUsers] = useState([]);
    const [coachUsers, setCoachUsers] = useState([]);
    const [selectedCoachIds, setSelectedCoachIds] = useState([]);
    const [encountersYearStats, setEncountersYearStats] = useState([]);

    useEffect(() => {
        axios.get('/api/customers').then(response => {
            setUsers(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    const handleSelectionChange = (ids) => {
        setSelectedCoachIds(ids);
    };

    useEffect(() => {
        let encountersYearArray = Array.from({ length: 12 }, () => 0);
        let ratingArray = Array.from({ length: 5 }, () => 0);
        let ratingYearStats = Array.from({ length: 12 }, () => [...ratingArray]);

        const lastSelectedId = selectedCoachIds.at(selectedCoachIds.length - 1);

        if (lastSelectedId) {
            setCoachUsers([]);
            users.forEach((user) => {
                if (user._coach == lastSelectedId)
                    coachUsers.push(user);
            })

            for (let i = 0; i < coachUsers.length; i++) {
                axios.get(`/api/encounters?customer_id=${coachUsers[i]._id_customer}`).then(response => {
                const data = response.data;

                data.forEach((userData) => {
                    const date = userData._date;
                    const rating = userData._rating;
                    const dateCut = date.split("-");
                    encountersYearArray = fillYearStats(dateCut[0], dateCut[1], encountersYearArray);
                    ratingYearStats = fillRatingYearStats(dateCut[0], dateCut[1], rating, ratingYearStats);
                })

                }).catch(err => {console.error(err)});

            }
            setEncountersYearStats(encountersYearArray);
        }
    }, [selectedCoachIds]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/count_coachs').then(response => {
            setCoachNb(response.data);
        }).catch(err => {console.error(err)});
        axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
            setCustoNb(response.data);
        }).catch(err => {console.error(err)});
        axios.get('http://localhost:3000/api/customers/count_customers_by_gender').then(response => {
            setGenderDisp(response.data);
        }).catch(err => {console.error(err)});
        axios.get('http://localhost:3000/api/customers/group_customer_by_age').then(response => {
            setCustoAge(response.data);
        }).catch(err => {console.error(err)});
        axios.get('http://localhost:3000/api/encounters/count_encounters').then(response => {
            console.log("nb of encounters:" + response.data);
        }).catch(err => {console.error(err)});
        axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
            setRating(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center justify-items-stretch bg-white">
                <div className="h-full flex-row pt-7 mx-10 mb-48">
             <DropdownStatisticsCoachs onSelectionChange={handleSelectionChange} label="enorme"/>
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Statistics
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4"></div>

                    <div className="flex justify-between items-start">
                        <div className="ml-10 mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
                            <div className="justify-center mb-3"><h2 className="ml-20">Encounters' rating</h2></div>
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
                        <div className="justify-center mb-3 ml-20"><h2 className="mr-0">Coaches Vs Customers</h2></div>
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
                        <div className="justify-center mb-3 ml-20"><h2 className="mr-20">Women vs Men</h2></div>
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

                    <div className="flex justify-between items-start">
                        <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                            <BarChart
                                width={500}
                                height={300}
                                series={[
                                    { data: customerAge, label: 'Number of Customer', id: 'uvId' },
                                ]}
                                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            />
                        </div>

                        <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                            <BarChart
                                width={500}
                                height={300}
                                series={
                                    [
                                        {data: encountersYearStats, label: 'Number of Dates', id: 'uvId'},
                                    ]
                                }
                                yAxis={[{ scaleType: 'band', data: yMonthes }]}
                                layout="horizontal"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>

    );
}
