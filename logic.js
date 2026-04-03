const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

exports.compressVideo = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // ensure compressed folder exists
        if (!fs.existsSync("compressed")) {
            fs.mkdirSync("compressed");
        }

        const inputPath = req.file.path;
        const outputPath = path.join(
            "compressed",
            `output-${path.basename(inputPath)}.mp4`
        );

        ffmpeg(inputPath)
            .outputOptions([
                "-vcodec libx264",
                "-crf 28"
            ])
            .on("end", () => {
                res.download(outputPath, (err) => {
                    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

                    if (err) console.error(err);
                });
            })
            .on("error", (err) => {
                console.error(err);

                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

                res.status(500).json({ message: "Compression failed" });
            })
            .save(outputPath);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};