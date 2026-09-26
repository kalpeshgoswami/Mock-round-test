import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";

const addUser = async (req, res, next) => {

    try {

        const { name, email, password, phone, address } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            phone,
            address
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "New user added and welcome email send",
            newUser
        })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

const UserLogin = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);


        if (!user) {
            return next(new HttpError("unable to login", 404))
        }

        const token = await user.generateAuthToken()

        res.status(200).json({ success: true, message: "login successfully", user, token })

    } catch (error) {
        return next(new HttpError(error.message))
    }

}

const AllUser = async (req, res, next) => {

    try {

        const userData = await User.find();

        if (!userData === 0) {
            return next(new HttpError("User data is not found", 404))
        }

        res.status(200).json({ success: true, message: "user data found successfully", total: userData.length, userData })

    } catch (error) {

        return next(new HttpError(error.message))

    }

}



export default { addUser, UserLogin, AllUser }