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

async function setWebsiteCookies(token, employeeWork)
{
  const jwtToken = generateToken({token});
  setSecureCookie('jwt-token', jwtToken);

  const encryptedUserRole = await sealData(employeeWork,
      { password: process.env.SECRET_KEY });
  setSecureCookie('user-role', encryptedUserRole);
}

async function getEmployeeWork(access_token) {

  let response = await fetch('https://soul-connection.fr/api/employees/me',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Group-Authorization": process.env.X_GROUP_KEY,
      Authorization: `Bearer ${access_token}`
    }})
  const data = await response.json();
  return data.work;
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

    const employeeWork = await getEmployeeWork(data.access_token);
    setWebsiteCookies(data.access_token, employeeWork);
    redirect('/');
}
