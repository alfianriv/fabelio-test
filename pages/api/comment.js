import prisma from "../../commons/database"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const comment = await createComment(req.body)

            return res.status(200).json({
                success: true,
                data: comment
            })
        }

        throw new Error("Error")
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "An error occurred",
        })
    }
}

const createComment = async (data) => {
    try {
        const comment = await prisma.commment.create({
            data: data
        })
        return comment
    } catch (error) {
        return false
    }

}