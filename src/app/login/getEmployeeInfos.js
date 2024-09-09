"use server"

import { unsealData } from "iron-session";
import { cookies } from 'next/headers';

export async function getEmployeeRole() {
    const employeeRoleCookie = cookies().get("employeeRole")?.value;
    if (!employeeRoleCookie)
        return null;
    const employeeRole = await unsealData(employeeRoleCookie,
        { password: process.env.SECRET_KEY });
    if (typeof employeeRole != "string")
        return null;
    return employeeRole;
}

export async function getEmployeeID() {
    const employeeIDCookie = cookies().get("employeeID")?.value;
    if (!employeeIDCookie)
        return null;
    const employeeID = await unsealData(employeeIDCookie,
        { password: process.env.SECRET_KEY });
    if (typeof employeeID != "number")
        return null;
    return employeeID;
}
