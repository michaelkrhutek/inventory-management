import { IUser, UserModel } from "../models/user-model";

export const getIsUserNameUnique = async (name: string): Promise<boolean> => {
    return !(await UserModel.exists({ name }).catch(() => true));
};

export const createUser = async (name: string): Promise<IUser> => {
    const isUserNameUnique: boolean = await getIsUserNameUnique(name);
    if (!isUserNameUnique) {
        throw('Name already exists');
    }
    const userModel = new UserModel({ name });
    return await userModel.save();
};

export const getUser = async (userId: string): Promise<IUser> => {
    return await UserModel.findById(userId).catch(() => {
        throw('User not found');
    });
}

export const getAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find({});
}
