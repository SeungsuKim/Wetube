import express from "express";
import routes from "../routes"
import {
    videoDetail,
    deleteVideo,
    getUpload,
    postUplaod,
    getEditVideo,
    postEditVideo
} from "../controllers/videoController";
import {
    uploadVideo,
    onlyPrivate
} from "../middlewares";

const videoRouter = express.Router();

// Uplaod
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUplaod);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;