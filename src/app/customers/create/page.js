import CustomerForm from "@/components/CustomerForm";
import Layout from "@/components/Layout";

export default function Home()
{
    return (
        <Layout>
            <div className="w-full flex-col items-center justify-center bg-white">
                <CustomerForm />
            </div>
        </Layout>
    );
}
