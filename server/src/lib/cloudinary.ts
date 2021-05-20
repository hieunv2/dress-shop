import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: `arrow-tech`,
  api_key: `535495259262133`,
  api_secret: `Y0b_vqXwDXH7JNukIIq8u4up-hY`,
});

export const Cloudinary = {
  upload: async (
    image: string,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      folder: `dress-shop/${folder}`,
      transformation: { width, height, crop: "fill" },
      overwrite: true,
      invalidate: true,
    });
    return res.secure_url;
  },
};
