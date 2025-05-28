const username = process.env.DB_USERNAME
const password = process.env.PASSWORD
if (!username || !password) {
    throw new Error('Username and password must be defined in environment variables');
}
export const connectionString = `mongodb+srv://${username}:${password}@cluster0.x7ofh2j.mongodb.net/signsetu?retryWrites=true&w=majority&appName=Cluster0`;