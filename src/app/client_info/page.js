import Layout from "@/components/Layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
    return (
        <Layout>
            <main className="min-h-screen w-full flex-col items-center grid justify-items-stretch bg-white">
                <div className="h-full flex-row pt-11 mx-10">
                    <div className="mb-4">
                        <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
                            Wardrobe
                        </h1>
                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-2"></div>


                    {/* hat/cap */}
                    <div className="w-full flex flex-row h-fit space-x-6 items-center justify-center">

                        <div className="w-full h-full grid justify-items-end items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-fit h-fit grid justify-items-center">
                            <img src="https://media2.chapellerie-traclet.com/40180-thickbox_default/chapeau-fedora-feutre-laine-noir-impermeable-traclet.jpg" className="aspect-auto w-3/12" width="w-fit" height="h-fit"></img>
                        </div>

                        <div className="w-full h-full grid justify-items-start items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>


                    {/* top */}
                    <div className="w-full flex flex-row h-fit space-x-6 items-center justify-center">

                        <div className="w-full h-full grid justify-items-end items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-fit h-fit grid justify-items-center">
                            <img src="https://i.ebayimg.com/images/g/4IsAAOSwpddgqEwp/s-l1200.jpg" className="aspect-auto w-3/12" width="w-fit" height="h-fit"></img>
                        </div>

                        <div className="w-full h-full grid justify-items-start items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>


                    {/* bottom */}
                    <div className="w-full flex flex-row h-fit space-x-6 items-center justify-center">

                        <div className="w-full h-full grid justify-items-end items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-fit h-fit grid justify-items-center">
                            <img src="https://media.wuerth.com/stmedia/modyf/eshop/products/std.lang.all/resolutions/normal/png-546x410px/1370911.png" className="aspect-auto w-3/12" width="w-fit" height="h-fit"></img>
                        </div>

                        <div className="w-full h-full grid justify-items-start items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>


                    {/* shoes */}
                    <div className="w-full flex flex-row h-fit space-x-6 items-center justify-center">

                        <div className="w-full h-full grid justify-items-end items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-fit h-fit grid justify-items-center">
                            <img src="https://m.media-amazon.com/images/I/61o8lAesIEL._AC_UY900_.jpg" className="aspect-auto w-3/12" width="w-fit" height="h-fit"></img>
                        </div>

                        <div className="w-full h-full grid justify-items-start items-center">
                            <button className="h-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="w-full h-0.5 bg-black mb-4 mt-4"></div>
                </div>
            </main>
        </Layout>
    );
}
