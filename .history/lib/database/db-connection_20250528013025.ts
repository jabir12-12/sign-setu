import dotenv from "dotenv";
dotenv.config();

const username = process.env.username
const password = process.env.password
if (!username || !password) {
    throw new Error('Username and password must be defined in environment variables');
}
export const connectionString = `mongodb+srv://${username}:${password}@cluster0.x7ofh2j.mongodb.net/signsetu?retryWrites=true&w=majority&appName=Cluster0`;