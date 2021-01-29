import axios from "axios";
import { randomBytes } from "crypto";
import fs from "fs";
import MjpegDecoder from "mjpeg-decoder";

const post = async (instances: any) => {
  const { data } = await axios.post(
    `${process.env.SERVER_TF}/v1/models/default:predict`,
    {
      instances,
    },
    {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  );

  return data;
};

const getDetectedObjects = async (room: any) => {
  const salt = randomBytes(4).toString("hex");
  const path = `./assets/screenshots/screenshot_${room.id}_${salt}.jpg`;

  console.log(`Picking Room id: ${room.id} with url: ${room.url}`);

  const decoder = new MjpegDecoder(room.url, { maxFrames: 1 });
  const frame = await decoder.takeSnapshot();

  fs.writeFileSync(path, frame);

  fs.unlinkSync(path);
};

export { post, getDetectedObjects };
