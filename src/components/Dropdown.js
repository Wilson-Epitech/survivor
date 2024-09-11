import dropdown_customers_coach from "./dropdown_customers_coach"
import DropdownCustomers from "./DropdownCustomers"
import DropdownCoachs from "./DropdownCoachs"

export function Dropdown_coach({children})
{
    return (
        <div>
            <dropdown_customers_coach />
                {children}
        </div>
    );
}

export function DropdownStatisticsCoachs({children, label})
{
    return (
        <div>
            <DropdownCoachs label={label}/>
                {children}
        </div>
    );
}

export default function Dropdown({children, label})
{
    return (
        <div>
            <DropdownCustomers label={label}/>
                {children}
        </div>
    );
}
