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
        <div className="min-h-screen w-full flex-col items-center justify-center bg-white">
          <div className="h-4/6 pt-11 mx-10 mt-10">

            <div className="mb-4 flex flex-col items-center justify-center">
              <h1 className="items-center justify-center text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-whiten">Soul Connection</h1>
              <h3 className="mt-5 items-center justify-center text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-whiten">Dashboard</h3>
            </div>
            <div className="w-full h-0.5 bg-black mb-4 mt-2"></div>

            <div className="ml-10 mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
              <div className="mb-4 flex flex-row items-center justify-between">
                <p className="text-9xl text-blue-300">{numberCoach}</p>
                <p className="text-9xl text-blue-400">{numberCustomer}</p>
                <p className="text-9xl text-blue-500">{numberDate}</p>
                <p className="text-9xl text-blue-600">{numberEvent}</p>
              </div>
  
              <div className="mb-4 flex flex-row items-center justify-between">
              <p className="text-5xl">Coaches</p>
                <p className="text-5xl">Customers</p>
                <p className="text-5xl mr-24">Dates</p>
                <p className="text-5xl mr-[4.7rem]">Events</p>
              </div>
            </div>

            <div className="mb-4 flex flex-row items-center justify-center mt-28">
              <p className="text-9xl text-green-300">23.975,43$</p>
            </div>
            <div className="mb-4 flex flex-row items-center justify-center mt-5">
              <p className="text-5xl text-black">Sales Revenue</p>
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
}
