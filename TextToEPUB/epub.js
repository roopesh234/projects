const EPub = require("epub");
const cheerio = require("cheerio");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

function extractTextFromEPUB(filePath) {
  return new Promise((resolve, reject) => {
    const epub = new EPub(filePath);
    let allText = "";
    epub.on("end", function () {
      const chapterPromises = epub.flow.map((chapter, index) => {
        return new Promise((resolveChapter, rejectChapter) => {
          epub.getChapter(chapter.id, function (err, html) {
            if (err) {
              return rejectChapter(err);
            }

            const $ = cheerio.load(html);
            const text = $.text();
            resolveChapter(
              `Chapter ${index + 1}: ${chapter.title}\n${text}\n\n`
            );
          });
        });
      });

      Promise.all(chapterPromises)
        .then((chapterTexts) => {
          allText = chapterTexts.join("");
          resolve(allText);
        })
        .catch(reject);
    });
    epub.on("error", reject);
    epub.parse();
  });
}

function saveTextToFile(text, outputFolder, fileName) {
  const outputDir = path.join(__dirname, outputFolder);
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`Text successfully written to ${filePath}`);
    }
  });
}

app.get("/extract-text", async (req, res) => {
  const filePath = path.join(__dirname, "./Input"); // Replace with your EPUB file path
  try {
    const text = await extractTextFromEPUB(filePath);
    // Save the extracted text to a file (output.txt in the 'output' folder)
    saveTextToFile(text, "Output", ".txt");

    res.send(text);
  } catch (err) {
    res.status(500).send("Error extracting text: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/extract-text`);
});
