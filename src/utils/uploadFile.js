import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: Buffer.from(process.env.GCS_PRIVATE_KEY, 'base64').toString(),
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

export default (file) =>
  new Promise((resolve, reject) => {
    const filename = file.originalname;
    const bucketFile = bucket.file(filename);
    const stream = bucketFile.createWriteStream();

    stream.on("error", (err) => {
      reject(err);
    });

    stream.on("finish", () => {
      resolve(
        `http://storage.googleapis.com/${process.env.GCS_BUCKET}/${filename}`
      );
    });

    stream.end(file.buffer);
  });
