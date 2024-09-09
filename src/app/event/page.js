"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
  } from '@vis.gl/react-google-maps';

const paris_x = 48.866667;
const paris_y = 2.333333;

export default function Home() {
    const [events, set_events] = useState([]);
    const [selected_x = paris_x, set_selected_x] = useState();
    const [selected_y = paris_y, set_selected_y] = useState();
    const [selected_event = 0, set_selected_event] = useState();

    useEffect(() => {
        axios.get('/api/events/get_events').then(response => {
            set_events(response.data);
        });
    }, []);

    const handleChange = (set_selected_change, nb) => {
        set_selected_change(() => {
            const new_selected_pos = nb;
            return new_selected_pos;
        });
    };

    return (
        <Layout>
            <main className="h-screen w-full flex-col items-center bg-white">
                <div className="mx-10 mt-24 h-4/5">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Events
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>
                    <div className="flex flex-row h-full w-full gap-6">
                        <div className="h-full w-1/2">
                            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}>
                                <Map
                                    defaultZoom={15}
                                    mapId='01'
                                    center={ { lat: selected_x, lng: selected_y } }>
                                    {events.map(user => (
                                        <AdvancedMarker
                                            key={user._name}
                                            position={{ lat: user._location_x, lng: user._location_y }}>
                                            <Pin background={'#ff0000'} glyphColor={'#000'} borderColor={'#000'} />
                                        </AdvancedMarker>
                                    ))}
                                </Map>
                            </APIProvider>
                        </div>
                        <div className="w-1/2 h-full overflow-auto">
                            {events.map(user => (
                                <div className={`border-2 w-11/12 h-fit mt-4 ${selected_event === user._id_event ? 'border-blue-500' : 'border-black'}`}>
                                    <button className="w-full h-full" onClick={() => (handleChange(set_selected_x, user._location_x), handleChange(set_selected_y, user._location_y), handleChange(set_selected_event, user._id_event))}>
                                        <div className="flex flex-row w-full">
                                            <h1 className="w-full ml-2 text-2xl font-bold text-left">{user._name}</h1>
                                            <h1 className="text-right w-full mr-2 text-2xl font-bold">{user._date}</h1>
                                        </div>
                                        <div className="flex flex-row w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 size-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            <p className="text-2xl text-left">{user._location_name}</p>
                                        </div>
                                        <p className="ml-2 text-2xl text-left">Max participants: {user._max_participants}</p>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
