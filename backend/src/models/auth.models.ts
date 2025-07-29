import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';
import { Schema, Document, model, Query } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  passwordChangedAt: number;
  _confirmPassword?: string;
  active: boolean;
  comparePassword(inputPswd: string): Promise<boolean>;
  changedPasswordAfter(jwtTimestamp: number): boolean;
  createPasswordResetToken(): string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      min: 8,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// creates a virtual property that doesn't get added to the DB
userSchema.virtual('confirmPassword').set(function (value) {
  this._confirmPassword = value;
});

userSchema.methods.comparePassword = async function (inputPswd: string) {
  // This operation will return a boolean value
  // Also, if the password is not hashed, it will be hashed automaticallybefore comparison
  return await bcrypt.compare(inputPswd, this.password);
};

userSchema.methods.changedPasswordAfter = function (
  jwtTimestamp: number
): boolean {
  //* 1. check if the object has a passwordChangedAt field, which signals that the password has been changed
  if (!this.passwordChangedAt) return false;

  //* 2. If the password has been changed, compare the jwtTimestamp with passwordChangedAt and return a boolean value
  const changedTimestamp = this.passwordChangedAt / 1000;

  return jwtTimestamp < changedTimestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token before storing it in the database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //set the expiration time for the reset token
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre<UserDocument>('save', async function (next) {
  // check if the password field of the document is not modified and do nothing
  if (!this.isModified('password')) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // manually set the passwordChangedAt field to be in current timestamp
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// this validate middleware runs before the actual Schema is validated.
userSchema.pre<UserDocument>('validate', function (next) {
  if (this.isModified('password') && this.password !== this._confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match');
  }

  next();
});

userSchema.pre<Query<UserDocument, UserDocument>>(/^find/, function (next) {
  // Exclude soft-deleted records from queries
  this.find({ active: true });
  next();
});

const User = model<UserDocument>('User', userSchema);

export { User };
