export default function MaxWidthWrapper({children})
{
    return (
        <div className="bg-white">
            <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
                {children}
            </div>
        </div>
    )
}