/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = async (pathIn, pathOut) => {
  await fs.createReadStream(pathIn)
    .pipe(await unzipper.Extract({ path: pathOut }))
    .promise()
    .then(
      (res) => {
        console.log('Extraction operation complete');
      },
      (err) => {
        console.log('Error to complete');
      }
    )
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = async (dir) => {
  let arrayOfImages = [];

  let files = await fs.readdirSync(dir);

  if (files) {
    files.forEach((foundFile) => {
      if (foundFile.endsWith('.png') || foundFile.endsWith('.jpg') || foundFile.endsWith('.jpeg')) {
        arrayOfImages.push(path.join(foundFile));
      }
    });
  }
  return arrayOfImages
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = async (pathIn, pathOut) => {

  fs.createReadStream(path.join(__dirname, 'unzipped', pathIn))
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          
          var avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          this.data[idx] = avg;
          this.data[idx + 1] = avg;
          this.data[idx + 2] = avg;

          
          this.data[idx + 3] = this.data[idx + 3];
        }
      }

      this.pack().pipe(fs.createWriteStream(pathOut));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
