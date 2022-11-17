// @ts-ignore
global.__basedir = __dirname;
import server from "./app";
import {Server} from 'socket.io'
require('./repository/ConnectDatabase.ts')


const io  = new Server(server)


io.on('connection',(socket) => {
    console.log(`✅ socket id: [`+socket.id+`] connected`)

    socket.on('disconnect',() => {
        console.log(`❌ socket id: [`+socket.id+`] disconnected`)
    })
})


const post: number = Number(process.env.POST) || 8080;
server.listen(post, () => {
    console.log(`✅ Server running on port ${post}`);
});

export default io

