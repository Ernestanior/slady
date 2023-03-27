import ClassificationAPI from "@/store/apis/content/classification";
import VideoAPI from "@/store/apis/content/video";
import StreamAPI from "@/store/apis/content/stream";

export const classificationService = new ClassificationAPI();
export const videoService = new VideoAPI();
export const streamService = new StreamAPI();

