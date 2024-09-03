import Navbar from "./Navbar";

export default function Layout({children})
{
    return (
        <div className="bg-white flex-grow">
            <Navbar>
                {children}
            </Navbar>
        </div>
    );
}
