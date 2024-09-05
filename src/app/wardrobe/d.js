"use client";
import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [selectedItems, setSelectedItems] = useState({ hat: 0, top: 0, bottom: 0, shoes: 0 });
    const [clothes, setClothes] = useState([]);
    const [clothesImages, setClothesImages] = useState({ hat: [], top: [], bottom: [], shoes: [] });

    const handleSelectionChange = (ids) => setSelectedCustomerIds(ids);
    
    const handleItemChange = (type, delta) => {
        setSelectedItems(prev => ({ ...prev, [type]: prev[type] + delta }));
    };

    useEffect(() => {
        const lastSelectedId = selectedCustomerIds.at(-1);
        if (lastSelectedId) {
            axios.get(`/api/customers_clothe?id=${lastSelectedId}`)
                .then(response => setClothes(response.data))
                .catch(error => console.error("Failed to fetch clothes", error));
        }
    }, [selectedCustomerIds]);

    useEffect(() => {
        const fetchClothesImage = (type, index, imgArray) => {
            if (index !== 0) {
                axios.get(`/api/customers_clothe/image?id=${imgArray[index]}`)
                    .then(response => setClothesImages(prev => ({ ...prev, [type]: response.data })))
                    .catch(error => console.error("Failed to fetch clothes", error));
            }
        };

        const { hat, top, bottom, shoes } = selectedItems;
        fetchClothesImage("hat", hat, clothes.filter(c => c._type === "hat/cap").map(c => c._id_clothes));
        fetchClothesImage("top", top, clothes.filter(c => c._type === "top").map(c => c._id_clothes));
        fetchClothesImage("bottom", bottom, clothes.filter(c => c._type === "bottom").map(c => c._id_clothes));
        fetchClothesImage("shoes", shoes, clothes.filter(c => c._type === "shoes").map(c => c._id_clothes));
    }, [selectedItems, clothes]);

    const renderImageSlider = (type) => (
        <div className="flex flex-row items-center">
            <button className="mb-2 w-full h-full" onClick={() => handleItemChange(type, -1)}>{"<"}</button>
            {clothesImages[type].map(item => <img className="object-contain w-full h-36" src={`data:image/jpeg;base64, ${item._image}`} key={item._image} />)}
            <button className="mb-2 w-full h-full" onClick={() => handleItemChange(type, 1)}>{">"}</button>
        </div>
    );

    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center justify-center bg-white">
                <div className="h-4/6 pt-11 mx-10 mt-10">
                    <h1 className="mt-2 mb-4 text-5xl font-bold">Wardrobe</h1>
                    <Dropdown onSelectionChange={handleSelectionChange} />
                    <div className="grid gap-6">
                        {renderImageSlider("hat")}
                        {renderImageSlider("top")}
                        {renderImageSlider("bottom")}
                        {renderImageSlider("shoes")}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
