"use client";

import Layout from "@/components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

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

function fillOrderYearStats(year, month, amount, amountYearArray)
{
  for (let i = 0; i < amountYearArray.length; i++) {
      if (year == lastYear[i].year && month == lastYear[i].month) {
          amountYearArray[i] += amount;
      }
  }
  return amountYearArray;
}

export default function Home() {
  const [customerAge, setCustoAge] = useState([]);

  const xLabels = [
    '18-25',
    '26-33',
    '34-45',
    '46-60',
    '61-80'
  ];

  useEffect(() => {
      axios.get('/api/customers').then(response => {
          setUsers(response.data);
      }).catch(err => {console.error(err)});
  }, []);

  const handleSelectionChange = (ids) => {
      setSelectedCoachIds(ids);
  };

  useEffect(() => {
      axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
          setCustoNb(response.data);
      }).catch(err => {console.error(err)});
      axios.get('http://localhost:3000/api/customers/group_customer_by_age').then(response => {
          setCustoAge(response.data);
      }).catch(err => {console.error(err)});
  }, []);


  const [allRating, setAllRating] = useState(0);
  const [allAstro, setAllAstro] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const [ratingYearStats, setRatingYearStats] = useState([]);
  const [allZodiac, setAllZodiac] = useState([]);
  const [ratingYearPayment, setRatingYearPayment] = useState([]);


  let ratingArray = Array.from({ length: 5 }, () => 0);
  let ratingYearStatsTmp = Array.from({ length: 12 }, () => [...ratingArray]);
  let arrayZodiac = Array.from({ length: 12 }, () => 0);
  let orderYearStatTmp = Array.from({ length: 12 }, () => 0);

  useEffect(() => {
      axios.get('http://localhost:3000/api/encounters/getAllRating').then(response => {
          setAllRating(response.data);
      }).catch(err => {console.error(err)});
  }, []);

  useEffect(() => {
      if (allRating.length > 0) {
          for (let i = 0; i < allRating.length; i++) {
              let date = allRating[i]._date.split("-")
              ratingYearStatsTmp =  fillRatingYearStats(date[0], date[1], allRating[i]._rating, ratingYearStatsTmp);
              setRatingYearStats(ratingYearStatsTmp);
          }
      }
  }, [allRating])

  useEffect(() => {
      axios.get('http://localhost:3000/api/customers/allCustomerAstro').then(response => {
          setAllAstro(response.data);
      }).catch(err => {console.error(err)});
  }, []);

  useEffect(() => {
      if (allAstro.length > 0) {
          for (let i = 0; i < allAstro.length; i++) {
              arrayZodiac = fillZodiacSigns(allAstro[i]._astrological_sign, arrayZodiac);
              setAllZodiac(arrayZodiac)
          }
      }
  }, [allAstro])

  useEffect(() => {
      axios.get('http://localhost:3000/api/orders/getTimedOrder').then(response => {
          setAllOrders(response.data);
      }).catch(err => {console.error(err)});
  }, []);

  useEffect(() => {
      if (allOrders.length > 0) {
          for (let i = 0; i < allOrders.length; i++) {
              let date = allOrders[i]._date.split("-")
              orderYearStatTmp =  fillOrderYearStats(date[0], date[1], allOrders[i]._amount, orderYearStatTmp);
              console.log("TipTop:", orderYearStatTmp)
              setRatingYearPayment(orderYearStatTmp);
          }
      }
  }, [allOrders])

  console.log(ratingYearPayment)

  return (
      <Layout>
          <main className="w-full h-full bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
              <div className="h-full flex-row">
                  <div className="mb-4">
                      <h1 className="mt-2 mb-4 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
                          Dashboard
                      </h1>
                  </div>
              </div>

                  <div className="mt-10 ml-0 mr-0 lg:mr-10 lg:ml-10 flex justify-center p-4 rounded-sm lg:border-2 border-[#E4E6EF] lg:bg-white py-2 px-2">
                      <div className="flex flex-col rounded-sm lg:border-0 border-2 border-[#E4E6EF] bg-white lg:bg-transparent py-2 px-2">
                          <div className="mb-3"><h2 className="text-center">Customers' average age group</h2></div>
                          <BarChart
                              width={400}
                              height={300}
                              series={[
                                  { data: customerAge, label: 'Number of Customer', id: 'uvId' },
                              ]}
                              xAxis={[{ data: xLabels, scaleType: 'band' }]}
                          />
                      </div>
                  </div>

                  <div className="pr-10 pl-10 flex flex-col md:flex-col lg:flex-row lg:justify-between items-center lg:items-start">
                      <div className="mt-10 flex justify-center p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                              <div className="flex flex-col">
                                  <div className="mb-3"><h2 className="text-center font-bold">Earning over the past year</h2></div>
                                  <LineChart
                                      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                                      series={[
                                          {
                                          data: ratingYearPayment,
                                          },
                                      ]}
                                      width={500}
                                      height={300}
                                  />
                              </div>
                      </div>
                      <div className="mt-10 flex justify-center p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                              <div className="flex flex-col">
                                  <div className="mb-3"><h2 className="text-center font-bold">Dates' rating per month</h2></div>
                              <BarChart
                                  xAxis={[{ scaleType: 'band', data: ['10/23', '11/23', '12/23', '01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24'] }]}
                                  series={[
                                      { data: ratingYearStats.map(stats => stats[0]), label: '1', id: 'Rating 1' },
                                      { data: ratingYearStats.map(stats => stats[1]), label: '2', id: 'Rating 2' },
                                      { data: ratingYearStats.map(stats => stats[2]), label: '3', id: 'Rating 3' },
                                      { data: ratingYearStats.map(stats => stats[3]), label: '4', id: 'Rating 4' },
                                      { data: ratingYearStats.map(stats => stats[4]), label: '5', id: 'Rating 5' },
                                    ]}
                                  width={400}
                                  height={300}
                              />
                              </div>
                      </div>
                  <div className="flex justify-center overflow-auto">
                      <div className="mt-10 w-full flex justify-center p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                              <div className="flex flex-col">
                                  <div className="mb-3"><h2 className="text-center font-bold">Clients' astrological sign</h2></div>
                                  <PieChart
                                      series={[
                                          {
                                          data: [
                                              { id: 0, value: allZodiac[0], label: 'Aries' },
                                              { id: 1, value: allZodiac[1], label: 'Taurus' },
                                              { id: 2, value: allZodiac[2], label: 'Gemini' },
                                              { id: 3, value: allZodiac[3], label: 'Cancer' },
                                              { id: 4, value: allZodiac[4], label: 'Leo' },
                                              { id: 5, value: allZodiac[5], label: 'Virgo' },
                                              { id: 6, value: allZodiac[6], label: 'Libra' },
                                              { id: 7, value: allZodiac[7], label: 'Scorpio' },
                                              { id: 8, value: allZodiac[8], label: 'Sagittarius' },
                                              { id: 9, value: allZodiac[9], label: 'Capricorn' },
                                              { id: 10, value: allZodiac[10], label: 'Aquarius' },
                                              { id: 11, value: allZodiac[11], label: 'Pisces' }
                                          ],
                                          },
                                      ]}
                                      width={700}
                                      height={300}
                                  />
                              </div>
                      </div>
                  </div>
              </div>
          </main>
      </Layout>
  );
}
