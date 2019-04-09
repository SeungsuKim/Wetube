const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordButton");
const recordPreview = document.getElementById("jsRecordPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
    console.log(event.data);
}

const startRecording = async () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start Recording";
}

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        recordPreview.srcObject = stream;
        recordPreview.muted = true;
        recordPreview.play();
        recordBtn.innerHTML = "Strop Recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        console.log(error);
        recordBtn.innerHTML = "☹️ Cannot Record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
    init();
}