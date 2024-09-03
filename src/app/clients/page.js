import Layout from "@/components/Layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home()
{
    return (
        <MaxWidthWrapper>
            <Layout>
                <button
                    className="bg-green-400 p-1 text-md rounded-md py-1.5 px-2.5">
                    New Client
                </button>
                <div className="relative bg-white rounded-md shadow-xl">
                    <ul role="list" className="divide-y divide-gray-100 m-5">
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">Mathis Brehm</p>
                                    <p className="truncate text-xs leading-5 text-gray-500">mathis.brehm@epitech.eu</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:items-end">
                                <button className="text-sm leading-5 text-gray-900 bg-indigo-500 p-2 mr-2 rounded-lg">edit</button>
                                <button className="mt-1 text-sm leading-5 text-gray-900 bg-red-400 p-2 rounded-lg">delete</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </Layout>
        </MaxWidthWrapper>
    );
}

// export default function Home()
// {
//     return (
//         <div>
//             <div className="m-10 bg-white">
//             <ul role="list" className="divide-y divide-gray-100 m-5">
//                 <li className="flex justify-between gap-x-6 py-5">
//                     <div className="flex min-w-0 gap-x-4">
//                         <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
//                         <div className="min-w-0 flex-auto">
//                             <p className="text-sm font-semibold leading-6 text-gray-900">Mathis Brehm</p>
//                             <p className="truncate text-xs leading-5 text-gray-500">mathis.brehm@epitech.eu</p>
//                         </div>
//                     </div>
//                     <div className="hidden shrink-0 sm:flex sm:items-end">
//                         <button className="text-sm leading-5 text-gray-900 bg-blue-400 p-2 mr-2 rounded-lg">edit</button>
//                         <button className="mt-1 text-sm leading-5 text-gray-900 bg-red-400 p-2 rounded-lg">delete</button>
//                     </div>
//                 </li>
//             </ul>
//         </div>

//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-3 py-3"></th>
//                         <th scope="col" className=" py-3">
//                             nom
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             prenom
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             adress
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             phone number
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             description
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             attribution
//                         </th>
//                         <th></th>
//                         {/* <th scope="col" className="px-6 py-3">
//                             <span className="sr-only">Edit</span>
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             <span className="sr-only">Delete</span>
//                         </th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white">
//                         <th scope="row" className="pl-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                         <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
//                         </th>
//                         <td className="py-4">
//                             Brehm
//                         </td>
//                         <td className="px-6 py-4">
//                             Mathis
//                         </td>
//                         <td className="px-6 py-4">
//                             XXXXXXXXXXXXXXXXXXXXXXXXXX
//                         </td>
//                         <td className="px-6 py-4">
//                             0606060606
//                         </td>
//                         <td className="px-6 py-4">
//                             Aliquip non culpa officia esse nisi aliquip consectetur aliquip anim.
//                         </td>
//                         <td className="px-6 py-4">
//                             Me
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                             <button className="text-sm leading-5 text-gray-900 bg-blue-400 p-2 mr-2 rounded-lg">edit</button>
//                             <button className="mt-1 text-sm leading-5 text-gray-900 bg-red-400 p-2 rounded-lg">delete</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         </div>
//     );
// }