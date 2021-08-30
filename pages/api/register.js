import prisma from "../../commons/database"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            let user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                }
            })
            if (user) {
                return res.json({
                    success: false,
                    message: 'Username already registered'
                });
            }
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    throw new Error("Error")
                }

                if (hash) {
                    let insertData = {
                        username: req.body.username,
                        password: hash
                    }
                    let new_user = await prisma.user.create({
                        data: insertData
                    })
                }
            });
            
            return res.json({
                success: true,
                message: 'Success registered'
            })
        }

        throw new Error("Error")
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "An error occurred"
        })
    }
}