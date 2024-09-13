"use client"

import axios from 'axios';
import { useEffect, useState } from "react";
import CustomerForm from "@/components/CustomerForm";
import Layout from "@/components/Layout";
import UnauthorizedPopup from "@/components/UnauthorizedPopup"

export default function Home()
{
    const [employeeRole, setEmployeeRole] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/role').then(response => {
            setEmployeeRole(response.data);
        }).catch(err => {console.error(err)});
    }, []);

    return (
        <Layout>
            {!employeeRole ? null :
            (employeeRole === "Coach" ?
            <UnauthorizedPopup link={"/customers"} pageToRedirect={"customers"}/> :
            <div className="w-full flex-col items-center justify-center bg-white">
                <CustomerForm />
            </div>)}
        </Layout>
    );
}
