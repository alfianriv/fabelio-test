import prisma from "../../commons/database"

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            const products = await getProducts()

            if (products && products.length > 0) {
                for (let index = 0; index < products.length; index++) {
                    const res = await fetch(
                        "https://fabelio-scrapper-api.herokuapp.com/api/scrape", {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                            body: JSON.stringify({
                                url: `https://fabelio.com/ip/${products[index].product_slug}`
                            }),
                        }
                    );
                    const resp = await res.json()
                    if(resp.success){
                        await updateProduct({id: products[index].id, ...resp.data})
                    }
                }
            }

            return res.status(200).json({
                success: true,
                message: "ok"
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
        const products = await prisma.product.findMany()
        return products
    } catch (error) {
        return false
    }
}

const updateProduct = async (data) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: data.id
            },
            data: data
        })
        return product
    } catch (error) {
        return false
    }
}