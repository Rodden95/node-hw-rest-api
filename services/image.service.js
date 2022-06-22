const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const temp = path.join(__dirname, "../public");
const AVATARS = "avatars";
const uploadImage = async (id, file) => {
  const avatarUrl = path.join(AVATARS, `${id}${file.originalname}`);

  try {
    await sharp(file.path)
      .resize({ width: 250 })
      .toFile(path.join(temp, avatarUrl));
    return avatarUrl;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await fs.unlink(file.path, () => {});
  }
};

module.exports = uploadImage;
