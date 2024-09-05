"use client";
import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";

export default function Home() {
    return (
        <Layout>
            <main className="sm:w-fit md:w-fit lg:w-full flex-col items-center grid justify-items-stretch bg-white">
                <div className="h-5/6 flex-row pt-7 mx-10 mb-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Coaches
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>

                    <div className="flex flex-row gap-6 sm:-mx-6 lg:-mx-8 w-full py-2 sm:px-12 lg:px-8">
                        <table className="w-full text-left text-sm font-light">
                            <thead className="border-2 border-black bg-[#2C84B9] font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                <tr>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">#</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Name</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Birth Date</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Customers</th>
                                    <th scope="col" className="px-4 py-2 border-2 border-black text-white">Last connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">1</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">Otto</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">29-01-1987</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2"><Dropdown /></td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">03-09-2024</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">2</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">Otto</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">29-01-1987</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2"><Dropdown /></td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">03-09-2024</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="border-2 border-black bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">3</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">Otto</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">29-01-1987</td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2"><Dropdown /></td>
                                    <td className="whitespace-nowrap border-2 border-black px-4 py-2">03-09-2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
