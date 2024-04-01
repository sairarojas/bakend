import mongoose from "mongoose";

const requerimiento = new mongoose.Schema(
    {
        fecha:{type:Date, required: true},
        id_distribucion_ficha:{type:mongoose.Schema.Types.ObjectId,ref:'Distribucion_ficha',required:true},
        id_usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Requerimiento", requerimiento)