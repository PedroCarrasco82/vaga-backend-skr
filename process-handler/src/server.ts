import app from "./app";

const PORT = process.env.SCRAP_PROCESS_PORT || 3001

app.listen(PORT, () => console.log(`server is running on ${PORT}`))