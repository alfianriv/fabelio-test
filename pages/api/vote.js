import prisma from "../../commons/database"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const comment = await updateVote(req.body)

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

const updateVote = async (data) => {
    try {
        const comment = await prisma.commment.findUnique({
            where: {
                id: data.id,
            }
        })
        if (!comment) {
            return false
        }
        let updatedData = {}
        if (data.vote == "up") {
            updatedData.upvote = comment.upvote + 1
        }else{
            updatedData.downvote = comment.downvote + 1
        }
        const update = await prisma.commment.update({
            where: {
                id: data.id
            },
            data: updatedData
        })
        return update
    } catch (error) {
        return false
    }

}