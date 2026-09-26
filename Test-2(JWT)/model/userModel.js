import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (value.toLowerCase() === "password") {
                return "password can't be as a password"
            }
        }
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    phone: {
        type: String,
        required: true
    },

    isVerified: {
        type: String,
    },
    address: {
        type: String,
    },

    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]


}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    const user = this;

    if (user.isModified("Password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

userSchema.statics.findByCredentials = async function (email, password) {

    try {

        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("unable to login")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("unable to login")
        }

        return user;

    } catch (error) {
        throw new Error(error.message)
    }

}

userSchema.methods.generateAuthToken = async function () {
    try {

        const user = this;

        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        if (!token) {
            throw new Error("failed to generate auth token")
        }

        user.tokens = user.tokens.concat({ token })

        await user.save()

        return token;

    } catch (error) {

        throw new Error(error.message)

    }
};

const User = mongoose.model("user", userSchema)

export default User;