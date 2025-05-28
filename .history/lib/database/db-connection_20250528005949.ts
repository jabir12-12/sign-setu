const username = process.env.username
const password = process.env.password
if (!username || !password) {
    throw new Error('Username and password must be defined in environment variables');
}