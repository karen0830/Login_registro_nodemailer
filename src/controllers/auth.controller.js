import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import { createAcccessToken } from '../libs/jwt.js'
import { enviarMail } from '../nodemailer/node_mailer.js'

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    try {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Si ya existe un usuario con el mismo correo, responder con un mensaje de error
            return res.status(400).json({ message: 'El correo electrónico ya ha sido registrado' });
        }

        // Si no existe un usuario con el mismo correo, proceder con el registro
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hash,
        });
        const userSaved = await newUser.save();
        const token = await createAcccessToken({ id: userSaved._id });

        enviarMail(userSaved.email);

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al guardar el usuario o crear el token:', error);

        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const token = await createAcccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({
        message: "User not found"
    })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.creatdAte,
        updatedAt: userFound.updatedAt,
    })
}