'use server'

import { redirect } from 'next/navigation'
import { deleteCookies } from '../login/manageCookies';

export async function logout()
{
    await deleteCookies();
    redirect('/login');
}
