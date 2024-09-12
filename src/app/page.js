"use client";

import Layout from "@/components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Home() {
  const [numberCoach, setCoachNb] = useState(0);
  const [numberCustomer, setCustoNb] = useState(0);
  const [numberDate, setDateNb] = useState(0);
  const [numberEvent, setEventNb] = useState(0);

  const [numberRating, setRating] = useState([]);
  const [nbMenVsWomen, setGenderDisp] = useState([]);

  const [lastMeetings, setLastMeetings] = useState([]);
  const [ratingYearStats, setRatingYearStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employee/count_coachs').then(response => {
      setCoachNb(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/customers/count_customers').then(response => {
      setCustoNb(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/encounters/count_encounters').then(response => {
      setDateNb(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/events/count_events').then(response => {
      setEventNb(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
      setRating(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/customers/count_customers_by_gender').then(response => {
      setGenderDisp(response.data);
    }).catch(err => console.error(err));

    axios.get('http://localhost:3000/api/events/getIdEvent').then(response => {
      setLastMeetings(response.data);
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (lastMeetings.length === 0)
      return;

    let result = Math.max(...lastMeetings.map(meeting => meeting._id_event));

    if (result === 0)
      return;

    const getMeetingStats = async () => {
      let arrayEvents = [null, null, null, 0];
      let ratingYearStatsTmp = Array.from({ length: 5 }, () => [...arrayEvents]);

      for (let index = 0; index < 5; index++) {
        let idRef = result - index;

        try {
          const response = await axios.get(`api/events/eventById?id=${idRef}`);
          let data = response.data[0];

          if (data) {
            ratingYearStatsTmp[index] = {
              name: data._name,
              date: data._date,
              location: data._location_name,
              maxParticipants: data._max_participants
            };
          }
        } catch (err) {
          console.error(err);
        }
      }
      setRatingYearStats(ratingYearStatsTmp);
    };

    getMeetingStats();
  }, [lastMeetings]);

  return (
    <>
      <Layout>
        <div className="w-full h-full min-h-screen bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8 pt-16">
          <div className="mb-4">
            <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
              Dashboard
            </h1>
            <p className="text-[#889DB9] text-sm mb-2">Welcome!</p>
          </div>
          <div className="h-4/6 pt-11">

            <div className=" rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
              <div className="mb-4 flex lg:flex-row md:flex-col flex-col items-center justify-between gap-8">
                <div className="flex flex-col items-center">
                  <p className="text-9xl text-blue-300">{numberCoach}</p>
                  <p className="text-5xl">Coaches</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-9xl text-blue-400">{numberCustomer}</p>
                  <p className="text-5xl">Customers</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-9xl text-blue-500">{numberDate}</p>
                  <p className="text-5xl">Dates</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-9xl text-blue-600">{numberEvent}</p>
                  <p className="text-5xl">Events</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-10">
              <div className="p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                <h2 className="text-center">Encounters' rating</h2>
                <PieChart
                  series={[{ data: numberRating.map((val, idx) => ({ id: idx, value: val, label: `${idx + 1} Star` })) }]}
                  width={400}
                  height={200}
                />
              </div>

              <div className="p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                <h2 className="text-center">Coaches Vs Customers</h2>
                <PieChart
                  series={[{ data: [{ id: 0, value: numberCoach, label: 'Coaches' }, { id: 1, value: numberCustomer, label: 'Customers' }] }]}
                  width={400}
                  height={200}
                />
              </div>

              <div className="p-4 rounded-sm border-2 border-[#E4E6EF] bg-white py-2 px-2">
                <h2 className="text-center">Women vs Men</h2>
                <PieChart
                  series={[{ data: [{ id: 0, value: nbMenVsWomen[1], label: 'Women' }, { id: 1, value: nbMenVsWomen[0], label: 'Men' }] }]}
                  width={400}
                  height={200}
                />
              </div>
            </div>

            <div className="mt-10 p-4 rounded-lg bg-white shadow-lg overflow-auto">
              <table className="table-auto w-full text-left text-sm">
                <thead className="border-y-2 bg-white text-[#889DB9]">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Max Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {ratingYearStats.length > 0 ? (
                    ratingYearStats.map((meeting, index) => (
                      <tr key={index} className="border-y-2 border-[#E4E6EF] bg-white">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{meeting.name}</td>
                        <td className="px-4 py-2 text-[#889DB9]">{meeting.date}</td>
                        <td className="px-4 py-2 text-[#889DB9]">{meeting.location}</td>
                        <td className="px-4 py-2 text-[#889DB9]">{meeting.maxParticipants}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-2" colSpan="5">No events available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
