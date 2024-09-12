import EmployeeForm from "@/components/EmployeeForm";
import Layout from "@/components/Layout";

export default function Home()
{
    return (
        // <Layout>
        //     <div className="w-full flex-col items-center justify-center bg-white">
        //         <div className="min-w-max  pt-11 mx-10 mt-10">
        //             <div className="mb-4">
        //                 <h1 className="mt-2 mb-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900">
        //                     New Employee
        //                 </h1>
        //             </div>
        //             <div className="w-full h-0.5 bg-black mb-4 mt-2"/>
        //         </div>
        //     <div className="max-w-screen-sm">
        //         <EmployeeForm />
        //     </div>
        //     </div>
        // </Layout>
        <Layout>
            <div className="w-full flex-col items-center justify-center bg-white">
                <EmployeeForm />
            </div>
        </Layout>
    );
}
