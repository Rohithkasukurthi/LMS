const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Ensure Schema is imported

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Ensures password isn't returned in queries
    },
    batches: [{ type: Schema.Types.ObjectId, ref: 'Batch' }],
    sessions: [
      {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        sessionType: { type: String, enum: ['live', 'recorded'], required: true },
        trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer' },
        recordingLink: { type: String },
        liveLink: { type: String }
      }
    ]
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

// Export the Trainer model
const TrainerModel = mongoose.model('Trainer', userSchema);

module.exports = TrainerModel;
