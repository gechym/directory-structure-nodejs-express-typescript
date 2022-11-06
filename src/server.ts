import server from "./app";

require('./repository/ConnectDatabase.ts')
const post: number = Number(process.env.POST) || 8080;
server.listen(post, () => {
    console.log(`✅ Server running on port ${post}`);
});