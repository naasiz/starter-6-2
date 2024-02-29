const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: BCITstragram Lab Project
 *
 * Created Date: 
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile1.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");



async function appFunction() {
    
    await IOhandler.unzip(zipFilePath, pathUnzipped);

    let arrayOfImages = await IOhandler.readDir(pathUnzipped);

   
    for (let i = 0; i < arrayOfImages.length; i++) {
        await IOhandler.grayScale(arrayOfImages[i], pathProcessed + '/' + arrayOfImages[i]);
    }
}
appFunction();