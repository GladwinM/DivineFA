import AWS from "aws-sdk";
import {
  AWS_ACCESSKEYID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_SECERTACCESSKEY,
} from "../config";
// import { v4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESSKEYID, // Add your AWS access key ID here
  secretAccessKey: AWS_SECERTACCESSKEY, // Add your AWS secret access key here
  region: AWS_REGION, // Add your AWS region here
});

export const uploadFileToS3 = async (file, key, existingKey) => {
  const fileType = file.type || "application/octet-stream";
  const fileExtension = fileType.split("/")[1] || "bin";

  // Derive the file name from the file object (file.name)
  const fileName = file.name || `file.${fileExtension}`;
  // If an existing key is provided, use it, otherwise use the folder key + the file name
  const s3Key = existingKey || `${key}/${fileName}`;
  console.log(file,s3,fileExtension,fileName)
  const params = {
    Bucket: AWS_BUCKET,
    Key: s3Key,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
    // CacheControl: "no-cache"
  };
  try {
    if (!existingKey) {
      const data = await s3.upload(params).promise();
      return data.Key;
    } else {
      console.log(existingKey, file, "existing");
      const data = await s3.putObject(params).promise();
      console.log(data);
      return existingKey;
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const deleteFileFromS3 = async (key) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: key, // The S3 key of the file to delete
  };

  try {
    // Delete the file from S3
    const data = await s3.deleteObject(params).promise();
    console.log("File deleted successfully:", data);
    return data; // Return the response from S3 (could be useful for logging or further actions)
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error; // Rethrow the error if needed
  }
};

export const getFileUrlFromS3 = (key) => {  
  return `https://${AWS_BUCKET}.s3.amazonaws.com/${key}`;
};