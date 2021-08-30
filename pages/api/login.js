import prisma from "../../commons/database"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                }
            })

            if(!user){
                return res.status(200).json({
                    success: false,
                    message: "User does not exist"
                })
            }

            return bcrypt.compare(req.body.password, user.password).then(function (result) {
                if (result) {
                    return res.json({
                        success: true,
                        data: {
                            token: jwt.sign({id: user.id, username: user.username}, 'secret'),
                            id: user.id,
                            username: user.username
                        }
                    })
                }
                return res.json({
                    success: false,
                    message: 'Username and password not match'
                })
            });
        }

        throw new Error("Error")
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "An error occurred"
        })
    }
}