const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordButton");
const recordPreview = document.getElementById("jsRecordPreview");

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        recordPreview.srcObject = stream;
        recordPreview.muted = true;
        recordPreview.play();
    } catch (error) {
        console.log(error);
        recordBtn.innerHTML = "☹️ Cannot Record";
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if (recordContainer) {
    init();
}