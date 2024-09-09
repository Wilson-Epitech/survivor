import EmployeeForm from "@/components/EmployeeForm";
import Layout from "@/components/Layout"
import {PutObjectCommand, S3Client, ListObjectsV2Command, DeleteObjectCommand} from '@aws-sdk/client-s3'
import mongoose from 'mongoose';
import mime from 'mime-types';

const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
});

export default async function Page ()
{

const uri = process.env.MONGODB_URI;
const bucketName = process.env.BUCKETNAME;

mongoose.connect(uri);

  try {
    for (let i = 1; i <= 100; i++) {
      let id_custo = i.toString();
      let url = `https://soul-connection.fr/api/customers/${id_custo}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const customerData = await data.json()

    //   console.log(`
    //     ID: ${customerData.id}
    //     Email: ${customerData.email}
    //     Name: ${customerData.name}
    //     Surname: ${customerData.surname}
    //     Birthday: ${customerData.birth_date}
    //     Gender: ${customerData.gender}
    //     Description: ${customerData.description}
    //     Astrological Sign: ${customerData.astrological_sign}
    //     Phone Number: ${customerData.phone_number}
    //     Address: ${customerData.address}
    //   `);

    console.log(`
        ID: ${customerData.id}
      `);

      let imageUrl = `https://soul-connection.fr/api/customers/${id_custo}/image`;

      const imageResp = await fetch(imageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const imageBlob = await imageResp.arrayBuffer();

            // const command = new ListObjectsV2Command({
            //     Bucket: bucketName,
            //     Prefix: customerData.id,
            // });

            // const response = await client.send(command);
            // const files = response.Contents || [];

            // const filenames = files.map(file => file.Key);
            // console.log(filenames);

            // for (const filename of filenames) {
            //     try {
            //         await client.send(new DeleteObjectCommand({
            //             Bucket: bucketName,
            //             Key: filename,
            //         }));
            //         console.log(`File ${filename} deleted successfully.`);
            //     } catch (error) {
            //         console.error(`Error deleting file ${filename}:`, error);
            //     }
            // }



          const ext = "png";
          const newFilename = customerData.id + '_' + Date.now() + '.' + ext;
          const contentType = mime.lookup(ext) || 'application/octet-stream';

          await client.send(new PutObjectCommand({
              Bucket: bucketName,
              Key: newFilename,
              Body: Buffer.from(imageBlob),
              ACL: 'public-read',
              ContentType: contentType,
          }));

          const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
          console.log(link);

    //   console.log(`Image URL: ${imageBase64}`);

      // try {
      //   customer.create({
      //     _id_customer: customerData.id,
      //     _email: customerData.email,
      //     _name: customerData.name,
      //     _surname: customerData.surname,
      //     _birth_date: customerData.birth_date,
      //     _gender: customerData.gender,
      //     _description: customerData.description,
      //     _astrological_sign: customerData.astrological_sign,
      //     _phone_number: customerData.phone_number,
      //     _address: customerData.address,
      //     _image: imageBase64})
      // } catch (error) {
      //   console.error('Error inserting employees ${id_custo}:', error);
      // }

    //   setTimeout(() => {}, 3000)
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
// }

    return (
        <Layout>
           <EmployeeForm />
        </Layout>
    );
}