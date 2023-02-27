const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jimp = require("jimp");

const publicDir = path.join(__dirname, "./public");

const updateFiles = async (fieldname, file) => {
    const { path: tempName, originalname } = file;
    const [, extension] = originalname.split(".");
    const fileId = `${uuidv4(10)}.${extension}`;
    try {
        const resultUpload = path.join(publicDir, fieldname, fileId);
        await fs.rename(tempName, resultUpload);
        const fileUrl = path.join("public", fieldname, fileId);
        resizeImg(fileUrl);
        return fileUrl;
    } catch (err) {
        await fs.unlink(tempName);
        throw err;
    }
}

const resizeImg = async path => {
    await jimp.read(path, (err, img) => {
        if (err) throw err;
        img.resize(250, 250).writeAsync(path);
    });
}

module.exports = { updateFiles };