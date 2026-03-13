import { config } from 'dotenv';
import { createApp } from './app';
import { ConnectDataBase } from "./config/db";

export async function startServer() {
    config()
    const PORT = process.env.PORT_SERVER || 3333
    const app = createApp()

    await ConnectDataBase()
    app.listen(PORT, () => { console.log('Servidor rodando') })

}

startServer()
