import mongoose from "mongoose";

const distribucion_area = new mongoose.Schema(
    {
        codigo_auxiliar:{type:Number, required: true},
        valor_presupuesto:{type:Number, required: true,},
        Conexion_lote_red:{type:mongoose.Schema.Types.ObjectId,ref:'Conexion_lote_red',required:true},
        area_tematica:{type:mongoose.Schema.Types.ObjectId,ref:'Area_tematica',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Distribucion_area", distribucion_area)