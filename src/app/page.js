"use client"

import Layout from "@/components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Home()
{
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
    axios.get('http://localhost:3000/api/encounters/encounters_rating_numbers').then(response => {
      setRating(response.data);
  }).catch(err => {console.error(err)});
    axios.get('http://localhost:3000/api/customers/count_customers_by_gender').then(response => {
      setGenderDisp(response.data);
  }).catch(err => {console.error(err)});
    axios.get('http://localhost:3000/api/events/getIdEvent').then(response => {
      setLastMeetings(response.data);
    }).catch(err => {console.error(err)});
  }, []);

  let result = 0;
  for (let index = 0; index < lastMeetings.length; index++) {
    if (result < lastMeetings[index]._id_event)
      result = lastMeetings[index]._id_event;
  }


  useEffect(() => {

    let arrayEvents = [null, null];
    let ratingYearStatsTmp = Array.from({ length: 5 }, () => [...arrayEvents]);

    if (result == 0)
      return
    for (let index = 0; index < 5; index++) {
        let idRef = result - index;

        axios.get(`api/events/eventById?id=${idRef}`).then(response => {

          let data = response.data;

          let name = data[0]._name;
          let date = data[0]._date;
          let location = data[0]._location_name;
          let maxParticipants = data[0]._max_participants;

          ratingYearStatsTmp[index] = [name, date, location, maxParticipants]
        }).catch(err => {console.error(err)});

      }
      setRatingYearStats(ratingYearStatsTmp)
    }, [lastMeetings]);

    console.log(i)

  return (
    <>
      <Layout>
        <div className="min-h-full w-full flex-col items-center justify-center bg-white">
          <div className="h-4/6 pt-11 mx-10 mt-10">

            <div className="mb-4 flex flex-col items-center justify-center">
              <h1 className="items-center justify-center text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-whiten">Soul Connection</h1>
              <h3 className="mt-5 items-center justify-center text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-whiten">Dashboard</h3>
            </div>
            <div className="w-full h-0.5 bg-black mb-4 mt-2"></div>

            <div className="ml-10 mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
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

            <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between items-center lg:items-start">

              <div className="ml-10 mr-10 lg:mr-0 mt-10 border border-gray-300 p-4 rounded-lg shadow-lg">
                  <div className="justify-center mb-3">
                      <h2 className="ml-20">Encounters' rating</h2>
                  </div>
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

              <div className="mt-10 ml-10 mr-10 lg:mr-0 lg:ml-0 border border-gray-300 p-4 rounded-lg shadow-lg">
                  <div className="justify-center mb-3 ml-20">
                      <h2 className="mr-0">Coaches Vs Customers</h2>
                  </div>
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

              <div className="mt-10 ml-10 mr-10 lg:mr-0 lg:ml-0 border border-gray-300 p-4 rounded-lg shadow-lg">
                  <div className="justify-center mb-3 ml-20">
                      <h2 className="mr-20">Women vs Men</h2>
                  </div>
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
            <div>
               {/* <p>{ratingYearStats._name}</p> */}
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
}