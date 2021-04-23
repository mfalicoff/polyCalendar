import bcrypt from "bcrypt";
import { CreateUserDto } from "@dtos/users.dto";
import HttpException from "@exceptions/HttpException";
import { User } from "@interfaces/users.interface";
import { isEmpty } from "@utils/util";
import classModel from "@models/class.model";
import { Class } from "@interfaces/class/class.interface";

class ClassService {
    public classes = classModel;

    public async getAllClasses(): Promise<Class[]> {
        const classes: Class[] = await this.classes.find();
        return classes;
    }

    // public async findUserById(userId: string): Promise<User> {
    //     if (isEmpty(userId)) throw new HttpException(400, "You're not userId");
    //
    //     const findUser: User = await this.users.findOne({ _id: userId });
    //     if (!findUser) throw new HttpException(409, "You're not user");
    //
    //     return findUser;
    // }

    public async createClass(classData: Class): Promise<Class> {

        const createdClass: Class = await this.classes.create({
            ...classData
        });
        console.log(createdClass)
        return createdClass;
    }

    // public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    //     if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    //
    //     if (userData.email) {
    //         const findUser: User = await this.users.findOne({ email: userData.email });
    //         if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    //     }
    //
    //     if (userData.password) {
    //         const hashedPassword = await bcrypt.hash(userData.password, 10);
    //         userData = { ...userData, password: hashedPassword };
    //     }
    //
    //     const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    //     if (!updateUserById) throw new HttpException(409, "You're not user");
    //
    //     return updateUserById;
    // }
    //
    // public async deleteUser(userId: string): Promise<User> {
    //     const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    //     if (!deleteUserById) throw new HttpException(409, "You're not user");
    //
    //     return deleteUserById;
    // }
}

export default ClassService;
