import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
const app = express()

app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`)

  socket.on("spend", (data) => {
    socket.broadcast.emit("receive", data)
  })
})

httpServer.listen(3500, () => {
  console.log(`sever connected at port ${3500}`)
})
