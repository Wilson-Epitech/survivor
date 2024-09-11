const mongoose = require('mongoose');
const fetch = require('node-fetch');

const employeeSchema = new mongoose.Schema ({
    _id_employee: {type: Number, required: true},
    _email: {type: String, required: true},
    _name: {type: String, required: true},
    _surname: {type: String, required: true},
    _birth_date: {type: String, required: true},
    _gender: {type: String, required: true},
    _work: {type: String, required: true},
    _image: {type: String, required: true},
    _last_connexion: {type: String}
});

const employee = mongoose.model('employee', employeeSchema);

async function employeesToDatabase()  {

    try {

        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGODB_URI;
            if (!uri) throw new Error("MONGODB_URI is undefined");
            await mongoose.connect(uri);
        }

        let urlNbEmployee = `https://soul-connection.fr/api/employees`;
        const data = await fetch(urlNbEmployee, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "X-Group-Authorization": "***REMOVED***",
            Authorization: `Bearer ***REMOVED***`
            }
        });

        const employeeFromApi = await data.json();

        for (let i = 0; i <= employeeFromApi.length; i++) {

            const existingEmployee = await employee.findOne({ _id_employee: employeeFromApi[i].id});

            if (existingEmployee)
                continue;

            let url = `https://soul-connection.fr/api/employees/${employeeFromApi[i].id}`;
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

            let imageUrl = `https://soul-connection.fr/api/employees/${employeeFromApi[i].id}/image`;
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

            try {
                employee.create({
                    _id_employee: employeeData.id,
                    _email: employeeData.email,
                    _name: employeeData.name,
                    _surname: employeeData.surname,
                    _birth_date: employeeData.birth_date,
                    _gender: employeeData.gender,
                    _work: employeeData.work,
                    _image: imageBase64,
                    _last_connexion: ""
                })
                console.log(`Customer ${employeeData.id} inserted into the database.`);
            } catch (error) {
                console.error(`Error inserting customer ${employeeData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error during CustomerToDatabase execution:', error);
    }
}

module.exports = employeesToDatabase;
