export default function MaxWidthWrapper({children})
{
    return (
        <div className="h-full mx-auto w-full md:px-4">
            {children}
        </div>
    )
}