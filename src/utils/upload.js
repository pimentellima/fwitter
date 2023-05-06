import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';

export default multer({
    storage: new MulterGoogleCloudStorage({
      bucket: process.env.GCS_BUCKET,
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: process.env.GCS_KEYFILE,
    }),
});

  