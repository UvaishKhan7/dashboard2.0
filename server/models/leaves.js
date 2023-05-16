import mongoose from 'mongoose';

const leavesSchema = new mongoose.Schema(
    {
        userId: String,
        employeeName: {
            type: String,
            required: true
        },
        leaveType: {
            type: String,
            enum: ["casual", "sick"],
            default: "casual",
        },
        leaveFrom: {
            type: Date,
            required: true
        },
        leaveUpto: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
    },
);

const Leaves = mongoose.model('Leaves', leavesSchema);

export default Leaves;