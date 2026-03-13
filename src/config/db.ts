import mongoose from 'mongoose'

export async function ConnectDataBase(){
    try{
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("conectado com sucesso")
    }catch(error: any){
        console.error("erro ao conectar ao banco de dados: ", error)
        process.exit(1)
    }

}
