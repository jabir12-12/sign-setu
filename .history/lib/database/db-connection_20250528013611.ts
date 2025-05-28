import dotenv from "dotenv";
dotenv.config();

const username = process.env.USERNAME
const password = process.env.PASSWORD
console.log("USERNAME:", username);
console.log("PASSWORD:", password);
if (!username || !password) {
    throw new Error('Username and password must be defined in environment variables');
}
export const connectionString = `mongodb+srv://${username}:${password}@cluster0.x7ofh2j.mongodb.net/signsetu?retryWrites=true&w=majority&appName=Cluster0`;