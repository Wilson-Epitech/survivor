'use server'

import { redirect } from 'next/navigation';
import { setCookies } from '@/app/login/manageCookies'
import { updateEmployeeTimestamp } from '@/lib/updateEmployeeTimestamp';
import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';

async function getEmployeeData(email) {
  await mongooseConnect();

  try {
    const data = await employee.findOne({ _email: email }, {_id_employee: 1, _work: 1});
    return {id: data._id_employee, work: data._work};

  } catch (err) {
    console.error(err);
    return null;
  }
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
        return { message : 'Invalid Email and Password combination.' };
    }
    const data = await response.json();

    const employeeData = await getEmployeeData(email);
    if (!employeeData)
      return { message : 'Employee not in database yet. Please retry in 2 hours.' };
    await setCookies(data.access_token, employeeData.work, employeeData.id);
    await updateEmployeeTimestamp(employeeData.id);
    redirect('/');
}
