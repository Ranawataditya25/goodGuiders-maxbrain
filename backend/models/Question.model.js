import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  class: String,
  subject: String,
  type: {
    type: String,
    enum: ['mcq', 'subjective'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  question: String,
  options: [String], // Only for MCQ
  correctAnswer: String, // Only for MCQ
});


export default mongoose.model('Question', questionSchema);
