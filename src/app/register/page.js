"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <div className="flex min-h-full flex-col justify-center  rounded-lg shadow-2xl bg-white sm:max-w-lg">

                <div className="px-5 py-5">
                    <button className="place-items-start" title="Back to previous page" onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </div>

                <form className="space-y-6 px-24 py-1 lg:px-12" action="#" method="POST">
                    <div className="mb-4">
                        <h2 className="mt-2 mb-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Register new coache
                        </h2>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-mb font-medium leading-6 text-gray-900">Name</label>
                        <input id="name" name="name" type="name" required className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-mb font-medium leading-6 text-gray-900">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-mb font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-mb font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                    </div>
                </form>
                <div className="px-5 py-5"></div>
            </div>
        </main>
    );
}
