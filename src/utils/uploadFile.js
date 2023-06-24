import { Storage } from "@google-cloud/storage";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
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
