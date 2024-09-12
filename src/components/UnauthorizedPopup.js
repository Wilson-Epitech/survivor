import Link from "next/link";

export default function UnauthorizedPopup({link, pageToRedirect}) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Unauthorized access</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-lg text-gray-500">Redirecting to the {pageToRedirect} page in 5 seconds.</p>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                href={link}
                className="px-4 py-2 bg-[#2D6EB8] text-white text-base font-medium rounded-md shadow-sm hover:bg-[#4c7db5] focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Return to {pageToRedirect}
              </Link>

            </div>
          </div>
        </div>
      </div>
    );
}
