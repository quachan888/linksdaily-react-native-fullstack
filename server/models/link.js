import mongoose from 'mongoose';
const { Schema, ObjectId } = mongoose;

const linkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        link: {
            type: String,
            trim: true,
            required: true
        },
        urlPreview: {},
        postedBy: {
            type: ObjectId,
            ref: 'User'
        },
        views: {
            type: Number,
            default: 0
        },
        likes: [{ type: ObjectId, ref: 'User' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
