import Navbar from "./Navbar";

export default function Layout({children})
{
    return (
        <div className="bg-white flex-grow">
            <div className="bg-white min-h-screen flex">
                <Navbar />
                    {children}
            </div>
        </div>
    );
}
