"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAll = exports.login = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utility_1 = require("../utilities/utility");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const notification_1 = require("../utilities/notification");
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.body;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(500).json({
                message: `User already Exists`
            });
        }
        const salt = await (0, utility_1.saltGenerator)();
        const password = await (0, utility_1.passwordGenerator)(lastName);
        const hashedPassword = await (0, utility_1.hashPassword)(password, salt);
        if (!findUser) {
            let newUser = await userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: utility_1.hashPassword,
                role: 'Author',
                books: []
            });
            const mainUser = await userModel_1.default.findOne({ email });
            if (mainUser) {
                const html = (0, notification_1.emailHtml)(email, password);
                await (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, "Welcome", html);
                return res.status(200).json({
                    message: `User created successfully`,
                    role: mainUser.role
                });
            }
            return res.status(401).json({
                message: `Unable to create user`
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/create'
        });
    }
};
exports.createUser = createUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await userModel_1.default.findOne({ where: email });
        if (!users) {
            return res.status(404).json({
                message: `User does not exist, please register`
            });
        }
        if (userModel_1.default) {
            const validate = await bcryptjs_1.default.compare(password, users.password);
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid Password`
                });
            }
            if (validate) {
                const token = await (0, utility_1.tokenGenerator)(`${users._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `Login successful`,
                    email: users.email
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
};
exports.login = login;
const getAll = async (req, res) => {
    try {
        const allUsers = await userModel_1.default.find({});
        if (!allUsers) {
            return res.status(404).json({
                message: `Users not fetched`
            });
        }
        return res.status(200).json({
            message: `Users fetched successfully`,
            allUsers
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
};
exports.getAll = getAll;
const updateUser = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        const users = await userModel_1.default.findOne({ email });
        if (!users) {
            return res.status(404).json({
                message: `User does not exist`
            });
        }
        const updatedUser = await userModel_1.default.findOneAndUpdate({ email }, { firstName, lastName });
        if (updatedUser) {
            return res.status(200).json({
                message: `User updated successfully`,
                updatedUser
            });
        }
        return res.status(401).json({
            message: `Bros e no work, go find work`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const userToDelete = await userModel_1.default.findOneAndDelete({ email });
        if (!userToDelete) {
            return res.status(500).json({
                message: `I no fit delete am`
            });
        }
        const users = await userModel_1.default.find({});
        return res.status(200).json({
            message: `Deleted successfully`,
            users
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
};
exports.deleteUser = deleteUser;
