import dropdown_customers_coach from "./dropdown_customers_coach"
import DropdownCustomers from "./DropdownCustomers"

export default function Dropdown_coach({children})
{
    return (
        <div>
            <dropdown_customers_coach />
                {children}
        </div>
    );
}

export default function Dropdown({children})
{
    return (
        <div>
            <DropdownCustomers />
                {children}
        </div>
    );
}
