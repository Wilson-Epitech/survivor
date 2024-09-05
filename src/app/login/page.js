'use client'

import { logUser } from './login';
import { useFormState } from 'react-dom';

export default function Home() {

    const initialState = {
        message: ''
    };
    const [formState, formAction] = useFormState(logUser, initialState);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <div className="flex min-h-full flex-col justify-center px-24 py-12 lg:px-12 rounded-lg shadow-2xl bg-white sm:max-w-lg">
                <form className="space-y-6" action={formAction} method="POST">
                    <div className="mb-4">
                        <h2 className="mt-2 mb-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-mb font-medium leading-6 text-gray-900">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-mb font-medium leading-6 text-gray-900">Password</label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-mb font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
                {formState?.message && (<p className="text-red-500 text-sm text-center mt-4">{formState.message}</p>)}
                {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            register now
                        </a>
                    </p> */}
            </div>
        </main>
    );
}
