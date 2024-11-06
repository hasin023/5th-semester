import User from "../models/User"

export const getUsers = async () => {
    return await User.find();
}