export default function Home()
{
    return (
        <div className="m-10 bg-white">
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
                        <button className="text-sm leading-5 text-gray-900 bg-blue-400 p-2 mr-2 rounded-lg">edit</button>
                        <button className="mt-1 text-sm leading-5 text-gray-900 bg-red-400 p-2 rounded-lg">delete</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}
