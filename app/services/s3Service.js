import { config, S3 } from "aws-sdk";
import { aws } from "../../config";

export function upload(base64, folder) {
  let base64Image = base64?.split(";base64,").pop();
  var bitmap = new Buffer.from(base64Image, "base64");

  config.update({
    accessKeyId: aws.accessKey,
    secretAccessKey: aws.secretKey,
    region: aws.region,
  });

  var s3 = new S3();

  const params = {
    Bucket: aws.bucketName,
    Body: bitmap,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
    Key: `${folder}/` + Date.now() + ".jpg",
  };

  return new Promise((resolve, reject) => {
    try {
      s3.upload(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        }
        if (data) {
          console.log("Uploaded in:", data.Location);
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function copyImage(image) {
  config.update({
    accessKeyId: aws.accessKey,
    secretAccessKey: aws.secretKey,
    region: aws.region,
  });

  var s3 = new S3();

  const bucketName = aws.bucketName;
  const sourceFolder = "temp";
  const fileName = image.split("/").pop();
  const destFolder = "blogs";
  const s3Params = {
    Bucket: bucketName,
    CopySource: `${bucketName}/${sourceFolder}/${fileName}`,
    ACL: "public-read",
    Key: `${destFolder}/${fileName}`,
  };

  return new Promise((resolve, reject) => {
    try {
      s3.copyObject(s3Params, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        }

        if (data) {
          console.log("Uploaded in:", data);
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
