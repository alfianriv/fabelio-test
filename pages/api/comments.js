import prisma from "../../commons/database"

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            const comments = await getComments(req.query.product_id)

            return res.status(200).json({
                success: true,
                data: comments
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

const getComments = async (product_id) => {
    try {
        const comments = await prisma.commment.findMany({
            where: {
                product_id: parseInt(product_id),
            },
            orderBy: {
                id: 'desc'
            }
        })
        return comments
    } catch (error) {
        console.log(error)
        return false
    }

}