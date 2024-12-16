import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    method:String,
    url: String,
    status : String,
    responseTime: String,
    responseTimeMs: String,
},{
    timestamps : true,
    versionKey: false,
});

const TrafficModel = mongoose.model ("traffics",DataSchema);

export default TrafficModel;