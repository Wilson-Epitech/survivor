"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Stack from '@mui/material/Stack';
import DropdownStatisticsCoachs from "@/components/DropdownCoachs"

const lastYear = [{year: "2023", month: "10"}, {year: "2023", month: "11"}, {year: "2023", month: "12"},
    {year: "2024", month: "01"}, {year: "2024", month: "02"}, {year: "2024", month: "03"},
    {year: "2024", month: "04"}, {year: "2024", month: "05"}, {year: "2024", month: "06"},
    {year: "2024", month: "07"}, {year: "2024", month: "08"}, {year: "2024", month: "09"}]

const zodiacSigns = [{sign:"Aries"}, {sign:"Taurus"}, {sign:"Gemini"},
    {sign:"Cancer"}, {sign:"Leo"}, {sign:"Virgo"}, {sign:"Libra"}, {sign:"Scorpio"},
    {sign:"Sagittarius"}, {sign:"Capricorn"}, {sign:"Aquarius"}, {sign:"Pisces"}];

function fillRatingStats(rating, ratingArray)
{
    ratingArray[rating - 1]++;
    return ratingArray;
}

function fillZodiacSigns(zodiacSign, zodiacSignsArray)
{
    for (let i = 0; i < zodiacSignsArray.length; i++) {
        if (zodiacSign == zodiacSigns[i].sign) {
            zodiacSignsArray[i]++;
        }
    }
    return zodiacSignsArray;
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
    const [ratingYearStats, setRatingYearStats] = useState([]);
    const [zodiacCoaches, setZodiacCoaches] = useState([]);
    const [totalSumSale, setTotalSumSale] = useState(0);

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
        let zodiacSignsArray = Array.from({ length: 12 }, () => 0);
        let totalSum = 0;

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

                    data.forEach((userEncounter) => {
                        const date = userEncounter._date;
                        const rating = userEncounter._rating;
                        const dateCut = date.split("-");
                        encountersYearArray = fillYearStats(dateCut[0], dateCut[1], encountersYearArray);
                        ratingYearStats = fillRatingYearStats(dateCut[0], dateCut[1], rating, ratingYearStats);
                    })
                }).catch(err => {console.error(err)});

                axios.get(`/api/customers/customer_astro?id=${coachUsers[i]._id_customer}`).then(response => {
                    const data = response.data;
                    data.forEach((user) => {
                        const zodiacSign = user._astrological_sign;
                        zodiacSignsArray = fillZodiacSigns(zodiacSign, zodiacSignsArray);
                    })
                }).catch(err => {console.error(err)});

                axios.get(`/api/orders?id=${coachUsers[i]._id_customer}`).then(response => {

                    const data = response.data;

                    data.forEach((orders) => {
                        const ordersClient = orders._amount;
                        totalSum += ordersClient;
                    })
                    setTotalSumSale(totalSum)
                    setRatingYearStats(ratingYearStats)
                    setEncountersYearStats(encountersYearArray)
                    setZodiacCoaches(zodiacSignsArray)
                }).catch(err => {console.error(err)});

            }
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
        axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
            setRating(response.data);
        }).catch(err => {console.error(err)});
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

                    <div className="flex justify-center">
                        <h2 className="text-3xl">Global Statistics</h2>
                    </div>
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
                    <div className="justify-center">
                        <div className="w-full h-0.5 bg-black mb-4 mt-20"></div>
                        <div className="flex justify-center">
                            <h2 className="text-3xl">Coach Statistics</h2>
                        </div>
                        <div className="flex justify-center mt-6">
                            <DropdownStatisticsCoachs onSelectionChange={handleSelectionChange} label="Coach Selection"/>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                            {encountersYearStats.length > 0? (
                                <BarChart
                                    width={400}
                                    height={300}
                                    series={
                                        [
                                            {data: encountersYearStats, label: 'Number of Dates', id: 'uvId'},
                                        ]
                                    }
                                    yAxis={[{ scaleType: 'band', data: yMonthes }]}
                                    layout="horizontal"
                                />
                            ) : (
                                <p>Please select a coach</p>
                            )}
                        </div>
                        <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                            {ratingYearStats.length > 0 && ratingYearStats[0].length > 0 ? (
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: ['10/23', '11/23', '12/23', '01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24', '11/24', '12/24'] }]}
                                    series={[
                                        { data: [ratingYearStats[0][0], ratingYearStats[1][0], ratingYearStats[2][0], ratingYearStats[3][0], ratingYearStats[4][0], ratingYearStats[5][0], ratingYearStats[6][0], ratingYearStats[7][0], ratingYearStats[8][0], ratingYearStats[9][0], ratingYearStats[10][0], ratingYearStats[11][0]], label: '1', id: 'Rating 1'},
                                        { data: [ratingYearStats[0][1], ratingYearStats[1][1], ratingYearStats[2][1], ratingYearStats[3][1], ratingYearStats[4][1], ratingYearStats[5][1], ratingYearStats[6][1], ratingYearStats[7][1], ratingYearStats[8][1], ratingYearStats[9][1], ratingYearStats[10][1], ratingYearStats[11][1]], label: '2', id: 'Rating 2'},
                                        { data: [ratingYearStats[0][2], ratingYearStats[1][2], ratingYearStats[2][2], ratingYearStats[3][2], ratingYearStats[4][2], ratingYearStats[5][2], ratingYearStats[6][2], ratingYearStats[7][2], ratingYearStats[8][2], ratingYearStats[9][2], ratingYearStats[10][2], ratingYearStats[11][2]], label: '3', id: 'Rating 3'},
                                        { data: [ratingYearStats[0][3], ratingYearStats[1][3], ratingYearStats[2][3], ratingYearStats[3][3], ratingYearStats[4][3], ratingYearStats[5][3], ratingYearStats[6][3], ratingYearStats[7][3], ratingYearStats[8][3], ratingYearStats[9][3], ratingYearStats[10][3], ratingYearStats[11][3]], label: '4', id: 'Rating 4'},
                                        { data: [ratingYearStats[0][4], ratingYearStats[1][4], ratingYearStats[2][4], ratingYearStats[3][4], ratingYearStats[4][4], ratingYearStats[5][4], ratingYearStats[6][4], ratingYearStats[7][4], ratingYearStats[8][4], ratingYearStats[9][4], ratingYearStats[10][4], ratingYearStats[11][4]], label: '5', id: 'Rating 5'}
                                    ]}
                                    width={400}
                                    height={300}
                                />
                            ) : (
                                <p>Please select a coach</p>
                            )}
                        </div>

                        <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                            {ratingYearStats.length > 0 && ratingYearStats[0].length > 0 ? (
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                    <Gauge width={400} height={300} value={totalSumSale} startAngle={-90} endAngle={90} valueMax={2000} sx={{
                                        [`& .${gaugeClasses.valueText}`]: {
                                            fontSize: 30,
                                            transform: 'translate(0px, 0px)',
                                        },
                                        }}
                                        text={
                                            ({ value, valueMax }) => `${value}$ / ${valueMax}$`
                                        }
                                 />
                                </Stack>
                            ) : (
                                <p>Please select a coach</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center border border-gray-300 p-4 rounded-lg shadow-lg">
                    {ratingYearStats.length > 0 && ratingYearStats[0].length > 0 ? (
                            <PieChart
                                    series={[
                                        {
                                        data: [
                                            { id: 0, value: zodiacCoaches[0], label: 'Aries' },
                                            { id: 1, value: zodiacCoaches[1], label: 'Taurus' },
                                            { id: 2, value: zodiacCoaches[2], label: 'Gemini' },
                                            { id: 3, value: zodiacCoaches[3], label: 'Cancer' },
                                            { id: 4, value: zodiacCoaches[4], label: 'Leo' },
                                            { id: 5, value: zodiacCoaches[5], label: 'Virgo' },
                                            { id: 6, value: zodiacCoaches[6], label: 'Libra' },
                                            { id: 7, value: zodiacCoaches[7], label: 'Scorpio' },
                                            { id: 8, value: zodiacCoaches[8], label: 'Sagittarius' },
                                            { id: 9, value: zodiacCoaches[9], label: 'Capricorn' },
                                            { id: 10, value: zodiacCoaches[10], label: 'Aquarius' },
                                            { id: 11, value: zodiacCoaches[11], label: 'Pisces' }
                                        ],
                                        },
                                    ]}
                                    width={900}
                                    height={300}
                            />
                        ) : (
                            <p>Please select a coach</p>
                        )}
                    </div>
                </div>
            </main>
        </Layout>

    );
}
