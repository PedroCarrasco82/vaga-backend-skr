import app from "./app";

const PORT = process.env.API_PORT || 4001

app.listen(PORT, () => console.log(`server is running on ${PORT}`))