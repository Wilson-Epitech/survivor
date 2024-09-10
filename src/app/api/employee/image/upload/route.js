import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import mime from 'mime-types';

export async function POST(req)
{
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
    });

    const bucketName = process.env.BUCKETNAME;
    const formData = await req.formData();
    const file = formData.get('file');
    const image = await file.arrayBuffer();
    const { method } = req;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (method === 'POST') {
        try {
            const ext = mime.extension(file.type);
            const newFilename = Date.now() + '.' + ext;
            const contentType = mime.lookup(ext) || 'application/octet-stream';

            await client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: Buffer.from(image),
                ACL: 'public-read',
                ContentType: contentType,
            }));

            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

            return NextResponse.json(link);
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to save image', details: error.message }, { status: 404 });
            } else {
                return NextResponse.json({ error: 'Failed to save image', details: 'Unknown error' }, { status: 404 });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}
