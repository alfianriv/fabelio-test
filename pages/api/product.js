import prisma from "../../commons/database"
import { verifyToken, getAppCookies } from "../../commons/utlis"

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      if (!req.query.slug) {
        return res.status(200).json({
          success: false,
          message: "Slug is required"
        })
      }

      const product = await getProduct(req.query.slug)
      if (!product) {
        return res.status(200).json({
          success: false,
          message: "Product not found"
        })
      }

      return res.status(200).json({
        success: true,
        data: product
      })
    }

    if (req.method == "POST") {
      let cookie = getAppCookies(req)
      if (!cookie['token']) {
        return res.status(200).json({
          success: false,
          message: "Unathorized"
        })
      }

      const profile = verifyToken(cookie['token'])
      if (!profile) {
        return res.status(200).json({
          success: false,
          message: "Unathorized"
        })
      }

      req.body.user_id = profile.id
      const product = await createProduct(req.body)
      if (!product) {
        return res.status(200).json({
          success: false,
          message: "Failed submit product"
        })
      }

      return res.status(200).json({
        success: true,
        data: product
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

const getProduct = async (slug) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        product_slug: slug
      }
    })
    return product
  } catch (error) {
    return false
  }

}

const createProduct = async (data) => {
  try {
    const product = await prisma.product.create({
      data: data
    })

    return product
  } catch (error) {
    return false
  }
}