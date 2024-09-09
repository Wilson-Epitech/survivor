// "use client"

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import {
//   TEDropdown,
//   TEDropdownToggle,
//   TEDropdownMenu,
//   TEDropdownItem,
// } from "tw-elements-react";

// const DropdownCustomers = ({ onSelectionChange }) => {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         axios.get('/api/customers').then(response => {
//             console.log(response.data);
//             setUsers(response.data);
//         }).catch(err => {console.error(err)});
//     }, []);

//     const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

//     const handleCheckboxChange = (customerId) => {
//         setSelectedCustomerIds((prevSelectedIds) => {
//             const newSelectedIds = prevSelectedIds.includes(customerId)
//                 ? prevSelectedIds.filter(id => id !== customerId)
//                 : [...prevSelectedIds, customerId];

//             onSelectionChange(newSelectedIds);

//             return newSelectedIds;
//         });
//     };

//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <TEDropdown className="">
//         <TEDropdownToggle className="flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
//             All customers

//             <TEDropdownMenu className="max-h-52 overflow-scroll ">
//                 {users.map(user => (
//                     <TEDropdownItem>
//                         <a href="#" className="block w-full min-w-[160px] px-4 py-2 text-sm text-left text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
//                             <div className="flex">
//                                 <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" onChange={() => handleCheckboxChange(user._id_customer)} checked={selectedCustomerIds.includes(user._id_customer)}/>
//                                 <p className="pr-1 ml-1" key={user._name}>{user._name ? user._name : "vide"}</p>
//                                 <p className="pr-1" key={user._surname}>{user._surname ? user._surname : "vide"}</p>
//                             </div>
//                         </a>
//                     </TEDropdownItem>
//                 ))}
//             </TEDropdownMenu>
//         </TEDropdownToggle>
//     </TEDropdown>
//   );
// }

// export default DropdownCustomers;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
} from "tw-elements-react";

const DropdownCustomers = ({ onSelectionChange, label }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/customers")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomerIds((prevSelectedIds) => {
      let newSelectedIds;

      if (!prevSelectedIds.includes(customerId)) {
        newSelectedIds = prevSelectedIds.length > 0 ? [customerId] : [customerId];
      } else {
        newSelectedIds = prevSelectedIds.filter((id) => id !== customerId);
      }
      if (newSelectedIds.length === 0) {
        onSelectionChange(['']);
      } else {
        onSelectionChange(newSelectedIds);
      }
      return newSelectedIds;
    });
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <TEDropdown className="">
      <TEDropdownToggle className="flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        {label}

        <TEDropdownMenu className="max-h-52 overflow-scroll ">
          {users.map((user) => (
            <TEDropdownItem key={user._id_customer}>
              <a
                href="#"
                className="block w-full min-w-[160px] px-4 py-2 text-sm text-left text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
              >
                <div className="flex">
                  <input
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="hs-checked-checkbox"
                    onChange={() => handleCheckboxChange(user._id_customer)}
                    checked={selectedCustomerIds.includes(user._id_customer)}
                  />
                  <p className="pr-1 ml-1">{user._name ? user._name : "vide"}</p>
                  <p className="pr-1">
                    {user._surname ? user._surname : "vide"}
                  </p>
                </div>
              </a>
            </TEDropdownItem>
          ))}
        </TEDropdownMenu>
      </TEDropdownToggle>
    </TEDropdown>
  );
};

export default DropdownCustomers;
