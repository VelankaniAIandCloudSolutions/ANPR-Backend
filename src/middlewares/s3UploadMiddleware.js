const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION, // Set the region from environment variable
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set access key ID from environment variable
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set secret access key from environment variable
  },
});

const generateUniqueFilename = (file) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const originalname = file.originalname;
  const filename = `${timestamp}-${randomString}-${originalname}`;
  return filename;
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = generateUniqueFilename(file);
      cb(null, filename);
    },
  }),
});

module.exports = upload;
