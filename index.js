const { BlobServiceClient } = require("@azure/storage-blob");



const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
var fname = document.getElementById("fname");


const reportStatus = message => {
    status.innerHTML += `${message}<br/>`;
    status.scrollTop = status.scrollHeight;
}


// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://cefoliodatastore.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2023-06-11T02:50:02Z&st=2022-06-10T18:50:02Z&spr=https,http&sig=gj1MZHMdX4OI7%2BhK2wcc8lmFdt8jHjCKh8K0GOLgoc0%3D";


// Create a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by 
// appending the current time to the file name
const containerName = "resumes" 

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);



const uploadFiles = async () => {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        var filename = "";
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
            fname.innerText += "https://cefoliodatastore.blob.core.windows.net/resumes/" + `${file.name}`
            alert("https://cefoliodatastore.blob.core.windows.net/resumes/" + `${file.name}`)
        }
        await Promise.all(promises);
        reportStatus("Done.");
        listFiles();

    }
    catch (error) {
            reportStatus(error.message);
    }
}




selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

