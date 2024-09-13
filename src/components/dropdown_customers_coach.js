"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
} from "tw-elements-react";

const dropdown_customers_coach = ({ onSelectionChange , coach_id}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/customers').then(response => {
            setUsers(response.data);
        }).catch(err => console.error(err))
    }, []);

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleCheckboxChange = async (customerId) => {
        const isSelected = selectedCustomerIds.includes(customerId);

        setSelectedCustomerIds((prevSelectedIds) => {
            const newSelectedIds = isSelected
                ? prevSelectedIds.filter(id => id !== customerId)
                : [...prevSelectedIds, customerId];

            onSelectionChange(newSelectedIds);
            return newSelectedIds;
        });

        try {
            axios.post('/api/customers/assign_coach', {
                customerId,
                coachId: isSelected ? "0" : parseInt(coach_id)
            }).catch(err => console.error(err))
        } catch (error) {
            console.error(`Error updating customer ${customerId}:`, error);
        }
    };

    useEffect(() => {
        if (coach_id) {
            users.forEach(user => {
                if (parseInt(user._coach) === parseInt(coach_id)) {
                    selectedCustomerIds.push(user._id_customer);
                }
            });
        }
    }, [users, coach_id, selectedCustomerIds]);

  return (
    <TEDropdown className="">
        <TEDropdownToggle className="flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            assign customers

            <TEDropdownMenu className="max-h-52 overflow-scroll ">
                {users.map(user => (
                    <TEDropdownItem>
                        <a href="#" className="block w-full min-w-[160px] px-4 py-2 text-sm text-left text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                            <div className="flex">
                                <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" onChange={() => handleCheckboxChange(user._id_customer)} checked={selectedCustomerIds.includes(user._id_customer)} onClick={() => window.location.reload(false)}/>
                                <p className="pr-1 ml-1" key={user._name}>{user._name ? user._name : "vide"}</p>
                                <p className="pr-1" key={user._surname}>{user._surname ? user._surname : "vide"}</p>
                            </div>
                        </a>
                    </TEDropdownItem>
                ))}
            </TEDropdownMenu>
        </TEDropdownToggle>
    </TEDropdown>
  );
}

export default dropdown_customers_coach;
