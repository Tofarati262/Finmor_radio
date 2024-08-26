const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { parseUrl } = require  ("@smithy/url-parser");
const { formatUrl } = require ( "@aws-sdk/util-format-url");
const { Hash } = require  ("@smithy/hash-node");
const https = require ("https");
const { HttpRequest } = require ("@smithy/protocol-http");



const createPresignedUrlWithClient = ({ region, bucket, key }) => {
    const client = new S3Client({ region });
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  };
  
  // Function to upload file to S3 using presigned URL
  const put = (url, data) => {
    return new Promise((resolve, reject) => {
      const req = https.request(
        url,
        { method: "PUT", headers: { "Content-Length": Buffer.byteLength(data), timeout: 10000 } },
        (res) => {
          let responseBody = "";
          res.on("data", (chunk) => {
            responseBody += chunk;
          });
          res.on("end", () => {
            resolve(responseBody);
          });
        }
      );
      req.on("error", (err) => {
        reject(err);
      });
      req.write(data);
      req.end();
    });
  };
  
  const main = async (file) => {
    const REGION = process.env.REGION;
    const BUCKET = process.env.BUCKET_NAME;
    const KEY = file.originalname; // Use the original file name as the key
  
    try {
      const clientUrl = await createPresignedUrlWithClient({
        region: REGION,
        bucket: BUCKET,
        key: KEY,
      });
  
      console.log("Calling PUT using presigned URL with client");
      await put(clientUrl, file.buffer); // Use the file buffer directly
      console.log("\nDone. Check your S3 console.");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  

module.exports = {main};