import mongoose, { Document, model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import CollectionName from "@root/enums/collection-enum";

export interface IUserModel extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUserModel>({
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  age: { type: Number },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.plugin(paginate);
const UserModel = model<IUserModel, PaginateModel<IUserModel>>(
  CollectionName.USER,
  userSchema
);

export default UserModel;
