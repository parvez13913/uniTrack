import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'ManagementDepartment',
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
