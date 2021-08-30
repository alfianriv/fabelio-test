import prisma from "../../commons/database"

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            const product = await getProducts()

            return res.status(200).json({
                success: true,
                data: product
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

const getProducts = async () => {
    try {
        const product = await prisma.product.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return product
    } catch (error) {
        return false
    }

}