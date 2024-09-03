export default function Layout({children})
{
    return (
        <div className="bg-white min-h-screen flex">
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4">
                {children}
            </div>
        </div>
    );
}