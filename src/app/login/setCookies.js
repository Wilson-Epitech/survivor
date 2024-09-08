'use server'

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

export async function setCookies(token, employeeWork, employeeID) {
  const jwtToken = generateToken({token});
  const encryptedEmployeeRole = await encryptData(employeeWork);
  const encryptedEmployeeID = await encryptData(employeeID);

  setSecureCookie('jwtToken', jwtToken);
  setSecureCookie('employeeRole', encryptedEmployeeRole);
  setSecureCookie('employeeID', encryptedEmployeeID);
}
