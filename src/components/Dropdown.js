import DropdownCustomers from "./DropdownCustomers"

export default function Dropdown({children})
{
    return (
        <div>
            <DropdownCustomers />
                {children}
        </div>
    );
}
