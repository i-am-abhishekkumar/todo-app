import mongoose from "mongoose";
const noteSchema=new mongoose.Schema(
    {
    title:{
        type:String,
        required:true,
        trim:true,

    },
    content:{
        type:String,
        required:true,
    },
},
    { timestamps: true
    }   
)

// Auto-increment ID before saving
noteSchema.pre('save', async function() {
    if (this.isNew && !this.id) {
        try {
            const NoteModel = this.constructor;
            const maxNote = await NoteModel.findOne().sort({ id: -1 }).exec();
            this.id = maxNote && maxNote.id ? maxNote.id + 1 : 1;
        } catch (error) {
            console.error("Error in pre-save hook:", error);
            this.id = 1; // Fallback to 1 if query fails
        }
    }
});

const Note=mongoose.model('Note',noteSchema);
export default Note;