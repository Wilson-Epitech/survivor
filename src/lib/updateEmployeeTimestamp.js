import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';

function cutDate(dateInArray)
{
  let newDate = "";
  const monthPosition = 1;
  const yearPosition = 4;

  for (let i = monthPosition; i < yearPosition; i++) {
    newDate += dateInArray[i];
    if (i < yearPosition - 1)
      newDate += ' ';
  }
  return newDate;
}

export async function updateEmployeeTimestamp(employeeId)
{
  await mongooseConnect();

  let currentDate = new Date().toString();
  currentDate = cutDate(currentDate.split(" "));

  const findLoggedEmployee = { _id_employee: employeeId };
  const updateTimestamp = { _last_connexion: currentDate };

  try {
    await employee.updateMany(findLoggedEmployee, updateTimestamp);
  } catch(err) {
    console.error(err);
  }
}
