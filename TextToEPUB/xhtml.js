const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const PORT = 3001;

function extractTextFromXHTML(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, xhtmlData) => {
      if (err) {
        return reject("Error reading the XHTML file: " + err);
      }
      const $ = cheerio.load(xhtmlData, { xmlMode: true });

      const textContent = $.text();
      resolve(textContent);
    });
  });
}

async function processXhtmlFiles(inputFolder, outputFolder) {
  try {
    // Create the output folder if it doesn't exist
    /* if (!fs.existsSync(outputFolder)) {
      console.log(`Creating output folder: ${outputFolder}`);
      fs.mkdirSync(outputFolder, { recursive: true });
    } */

    const files = fs.readdirSync(inputFolder);
    for (const file of files) {
      const filePath = path.join(inputFolder, file);

      if (path.extname(file).toLowerCase() === ".xhtml") {
        try {
          // Extract text from the XHTML file
          const text = await extractTextFromXHTML(filePath);
          // Write the extracted text to the output folder with the same file name
          const outputFilePath = path.join(
            outputFolder,
            file.replace(".xhtml", ".txt")
          );
          fs.writeFileSync(outputFilePath, text);
          console.log(
            `Extracted text from ${file} and saved to ${outputFilePath}`
          );
        } catch (err) {
          console.error(`Error processing file ${file}:`, err);
        }
      } else {
        console.log(`${file} is not an XHTML file. Skipping.`);
      }
    }
  } catch (err) {
    console.error("Error reading the folder:", err);
  }
}

app.get("/extract-text", async (req, res) => {
  const inputFolder = path.join(__dirname, "./src folder"); // Input folder containing XHTML files
  const outputFolder = path.join(__dirname, "./str folder"); // Output folder to save the text files
  await processXhtmlFiles(inputFolder, outputFolder);
  res.send(outputFolder);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/extract-text`);
});
