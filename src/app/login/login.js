'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { generateToken } from './handleToken'
import { sealData } from "iron-session";

function setSecureCookie(cookieName, data) {
  return cookies().set(cookieName, data, {
    httpOnly: true,
    sameSite: "strict",
    secure: true
  })
}

async function encryptData(data) {
  return await sealData(data, {password: process.env.SECRET_KEY});
}

async function setWebsiteCookies(token, employeeWork, employeeID) {
  const jwtToken = generateToken({token});
  const encryptedUserRole = await encryptData(employeeWork);
  const encryptedUserID = await encryptData(employeeID);

  setSecureCookie('jwtToken', jwtToken);
  setSecureCookie('employeeRole', encryptedUserRole);
  setSecureCookie('employeeID', encryptedUserID);
}

async function getEmployeeData(access_token) {
  let response = await fetch('https://soul-connection.fr/api/employees/me',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Group-Authorization": process.env.X_GROUP_KEY,
      Authorization: `Bearer ${access_token}`
    }})
  return await response.json();
}

export async function logUser(message, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let response = await fetch('https://soul-connection.fr/api/employees/login',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Group-Authorization": process.env.X_GROUP_KEY
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
    })
    if (!response.ok) {
        return {
            message : 'Invalid Email and Password combination.'
        }
    }
    const data = await response.json();

    const employeeData = await getEmployeeData(data.access_token);
    setWebsiteCookies(data.access_token, employeeData.work, employeeData.id);
    redirect('/');
}
