"use client";
import Layout from "@/components/Layout";
import Dropdown from "@/components/DropdownCustomers";

export default function Home() {
    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center justify-center bg-white">
                <div className="h-screen pt-11 mx-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Tips
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"></div>
                    <div className="w-full h-5/6 overflow-auto">
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full pr-2">
                            <div className="border-2 border-black w-full max-w-max h-44 overflow-auto">
                                <h1 className="font-bold ml-2">
                                    How to Choose a Profile Picture for a Dating App
                                </h1>
                                <p className="ml-2 mt-2">
                                    Use a recent, high-quality photo where you are smiling and looking approachable. Avoid group photos or heavily edited images.
                                </p>
                            </div>
                            <div className="border-2 border-black w-full max-w-max h-44 overflow-auto">
                                <h1 className="font-bold ml-2">
                                    How to Choose a Profile Picture for a Dating App
                                </h1>
                                <p className="ml-2 mt-2">
                                    Use a recent, high-quality photo where you are smiling and looking approachable. Avoid group photos or heavily edited images.
                                </p>
                            </div>
                            <div className="border-2 border-black w-full max-w-max h-44 overflow-auto">
                                <h1 className="font-bold ml-2">
                                    How to Choose a Profile Picture for a Dating App
                                </h1>
                                <p className="ml-2 mt-2">
                                    Use a recent, high-quality photo where you are smiling and looking approachable. Avoid group photos or heavily edited images.
                                </p>
                            </div>
                            <div className="border-2 border-black w-full max-w-max h-44 overflow-auto">
                                <h1 className="font-bold ml-2">
                                    How to Choose a Profile Picture for a Dating App
                                </h1>
                                <p className="ml-2 mt-2">
                                    Use a recent, high-quality photo where you are smiling and looking approachable. Avoid group photos or heavily edited images.
                                </p>
                            </div>
                            <div className="border-2 border-black w-full max-w-max h-44 overflow-auto">
                                <h1 className="font-bold ml-2">
                                    How to Choose a Profile Picture for a Dating App
                                </h1>
                                <p className="ml-2 mt-2">
                                    Use a recent, high-quality photo where you are smiling and looking approachable. Avoid group photos or heavily edited images.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
