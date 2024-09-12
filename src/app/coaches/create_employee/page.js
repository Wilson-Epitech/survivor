import EmployeeForm from "@/components/EmployeeForm";
import Layout from "@/components/Layout";

export default function Home()
{
    return (
        <Layout>
            <div className="w-full flex-col items-center justify-center bg-white">
                <EmployeeForm />
            </div>
        </Layout>
    );
}
