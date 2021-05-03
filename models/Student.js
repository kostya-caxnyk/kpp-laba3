import mongoose from "mongoose"

const Schema = mongoose.Schema;

const studentScheme = new Schema({
        name: {
            type: String,
            required: true
        },
        groupId: {
            ref: 'Group',
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {timestamps: true}
);

export default mongoose.model("Student", studentScheme);
