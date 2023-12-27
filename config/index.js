module.exports = {
  port: process.env.PORT ?? 4065,
  key:
    process.env.KEY ??
    "$2a$12$Px4BgXSpSTGZcVrhvK27SeIt5fvdlp//RybVBv1/2PvX4iLVifMMG",
  database: {
    database: process.env.DB_NAME ?? "aimgame-stging",
    host: process.env.DB_HOST ?? "cluster0.o4rpy.mongodb.net",
    user: process.env.DB_USER ?? "yohan",
    password: process.env.DB_PASSWORD ?? "123admin",
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY ?? "AKIA26SJZPW5L5CGFNAJ",
    secretKey:
      process.env.AWS_SECRET_KEY ?? "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",
    bucketName: process.env.AWS_BUCKET_NAME ?? "aimgame-dev",
    region: process.env.AWS_DEFAULT_REGION ?? "ap-southeast-1",
  },
};
