import { upload } from "./s3Service";
import Test from "../models/test";

export async function testUpload(image) {
  const imageData = await upload(image, "users");
  const testData = await new Test({ image: imageData.Location }).save();
  return testData;
}
