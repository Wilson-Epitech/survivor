"use client"

import Layout from "@/components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Home()
{
  const [numberCoach, setCoachNb] = useState(0);
  const [numberCustomer, setCustoNb] = useState(0);
  const [numberDate, setDateNb] = useState(0);
  const [numberEvent, setEventNb] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employee/count_coachs').then(response => {
      setCoachNb(response.data);
    }).catch(err => {console.error(err)});
    axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
      setCustoNb(response.data);
    }).catch(err => {console.error(err)});
    axios.get('http://localhost:3000/api/encounters/count_encounters').then(response => {
      setDateNb(response.data);
    }).catch(err => {console.error(err)});
    axios.get('http://localhost:3000/api/events/count_events').then(response => {
      setEventNb(response.data);
    }).catch(err => {console.error(err)});
  }, []);

  return (
    <>
      <Layout>
        <div className="w-full h-screen bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
          <div className="mb-4">
            <h1 className="mt-2 mb-4 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
          <div className="h-4/6 pt-11 mx-10 mt-10">

            <div className="ml-10 mt-10 rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
              <div className="mb-4 flex lg:flex-row md:flex-col flex-col items-center justify-between gap-8">
                <div className="flex flex-col">
                  <p className="text-9xl text-blue-300">{numberCoach}</p>
                  <p className="text-5xl">Coaches</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-9xl text-blue-400">{numberCustomer}</p>
                  <p className="text-5xl">Customers</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-9xl text-blue-500">{numberDate}</p>
                  <p className="text-5xl mr-24">Dates</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-9xl text-blue-600">{numberEvent}</p>
                  <p className="text-5xl mr-[4.7rem]">Events</p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="mb-4 flex flex-col w-fit items-center justify-center mt-28 rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
                <p className="lg:text-9xl md:text-8xl text-7xl text-green-300">23.975,43$</p>
                <p className="lg:text-5xl md:text-4xl text-4xl text-black">Sales Revenue</p>
              </div>
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
}