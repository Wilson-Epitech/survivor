import mongoose, { mongo } from 'mongoose';
import {employee} from "../../mongoose_schemas/employee_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i < 100; i++) {
      let id_empl = i.toString();
      let url = `https://soul-connection.fr/api/employees/${id_empl}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const employeeData = await data.json()
      
      console.log(`
        ID: ${employeeData.id}
        Email: ${employeeData.email}
        Name: ${employeeData.name}
        Surname: ${employeeData.surname}
        Birthday: ${employeeData.birth_date}
        Gender: ${employeeData.gender}
        Work: ${employeeData.work}
      `);

      let imageUrl = `https://soul-connection.fr/api/employees/${id_empl}/image`;

      const imageResp = await fetch(imageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const imageBlob = await imageResp.arrayBuffer();
      const imageBase64 = Buffer.from(imageBlob).toString('base64');

      console.log(`Image URL: ${imageUrlBlob}`);

      try {
        employee.create({
          _id: employeeData.id,
          _email: employeeData.email,
          _name: employeeData.name,
          _surname: employeeData.surname,
          _birth_date: employeeData.birth_date,
          _gender: employeeData.gender,
          _work: employeeData.work,
          _image: imageBase64})
      } catch (error) {
        console.error('Error inserting employees ${id_empl}:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}