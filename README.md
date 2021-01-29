# tfjs-object-detection

> Object Detect with TensorFlow, React, Mongo, TS, Redis, WS

## Note

- `/server`
- `npm init -y` `tsc --init`
- `npm i typescript express @types/typescript @types/express axios @types/axios nodemon @types/nodemon`
- `npm i -D ts-node`

```ts
import express from "express";
import bodyParser from "body-parser";
import { indexRouter } from "./routes";

const app = express();
app.use(bodyParser.json({ type: "*/*" }));

app.get("/api/ping", (_, res) => {
  res.status(200).send({ pong: true });
});

app.use(indexRouter);

app.get("*", (_, res) => {
  res.status(400).send({ error: "Not Found" });
});

export { app };
```

- `npm i mongoose @types/mongoose`
- 正儿八经的 `ts` 版 `mongoose` 的 `model` 建立规范

```ts
import mongoose from 'mongoose';

interface RoomAttrs {
  url: string;
  left: number;
  top: number;
  width: number;
  height: number;
  roomWidth: number;
  roomHeight: number;
}

interface RoomDoc extends mongoose.Document {
  url: string;
  left: number;
  top: number;
  width: number;
  height: number;
  roomWidth: number;
  roomHeight: number;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

const roomSchema = new mongoose.Schema(
  {
    url: { type: String },
    left: { type: Number },
    top: { type: Number },
    width: { type: Number },
    height: { type: Number },
    roomWidth: { type: Number },
    roomHeight: { type: Number },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs)
}

const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema)

export { Room }

```

- <http://12.234.220.33:8888/mjpg/video.mjpg> 一个滑雪场的24小时实时监控
- <http://73.238.140.62/mjpg/video.mjpg> 一个海边的24小时实时监控
- `npm i mjpeg-decoder`
