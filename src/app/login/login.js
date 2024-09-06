'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { generateToken } from './handleToken'

export async function logUser(message, formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    let data = await fetch('https://soul-connection.fr/api/employees/login',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Group-Authorization": "***REMOVED***"
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
    })

    if (!data.ok) {
        return {
            message : 'Invalid Email and Password combination.'
        }
    }

    let token = await data.json();
    const jwtToken = generateToken({token});
    cookies().set('jwt-token', jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });
    redirect('/');
}
