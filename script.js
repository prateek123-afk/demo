
async function uploadVideo() {
    const fileInput = document.getElementById("videoInput");
    const status = document.getElementById("status");

    if (!fileInput.files.length) {
        status.innerText = "Please select a video";
        return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("video", file);

    status.innerText = "Uploading & Compressing... ⏳";

    try {
        const response = await fetch("/api/compress", {
            method:"POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Compression failed");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();

        status.innerText = "Download complete ✅";

    } catch (error) {
        console.error(error);
        status.innerText = "Error compressing video ❌";
    }
}