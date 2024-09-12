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
        }).catch(err => {console.error(err)});;
    }, []);

    const handleChange = (set_selected_change, nb) => {
        set_selected_change(() => {
            const new_selected_pos = nb;
            return new_selected_pos;
        });
    };

    return (
        <Layout>
            <main className="w-full h-screen px-4 py-5 sm:px-6 lg:px-8 pt-16">
                <div className="mb-4">
                    <h1 className="text-left text-2xl font-semibold leading-9 tracking-tight text-[#2D425C] mb-1">
                        Events
                    </h1>
                </div>
                <div className="flex flex-col h-full max-h-[95%] gap-6">
                    <div className="w-full h-full max-h-[400px] overflow-auto rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
                        {events.map(user => (
                            <div className={`rounded-sm border-2 w-full h-fit mt-2 ${selected_event === user._id_event ? 'border-blue-500' : 'border-[#E4E6EF]'}`}>
                                <button className="w-full h-full" onClick={() => (handleChange(set_selected_x, user._location_x), handleChange(set_selected_y, user._location_y), handleChange(set_selected_event, user._id_event))}>
                                    <div className="flex flex-row w-full">
                                        <h1 className="w-full pl-2 text-2xl text-left font-semibold leading-9 tracking-tight text-[#2D425C]">{user._name}</h1>
                                        <h1 className="text-2xl text-right pr-2 font-semibold leading-9 tracking-tight text-[#2D425C]">{user._date}</h1>
                                    </div>

                                    <p className="pl-2 text-base text-left text-[#889DB9]">{user._location_name}</p>

                                    <p className="pl-2 text-base text-left text-[#889DB9]">Max participants: {user._max_participants}</p>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="h-full w-full rounded-sm border-2 border-[#E4E6EF] bg-white py-4 px-4">
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
                </div>
            </main>
        </Layout>
    );
}
