import { testUpload } from "../services/TestService";

export async function testUpload(req, res, next) {
  const { image } = req.body;
  try {
    const data = await testUpload(image);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}
