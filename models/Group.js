import mongoose from "mongoose"

const Schema = mongoose.Schema;

const groupScheme = new Schema({
        name: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

export default mongoose.model("Group", groupScheme);
