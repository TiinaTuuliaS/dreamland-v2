import express from "express";

import {
    deleteProduct,
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct,
    updateProduct,
    getProductById,
} from "../controllers/product.controller.js";

import {
    adminRoute,
    protectRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ------------------------------------
// TUOTTEIDEN HAKU
// ------------------------------------

// Adminin kaikki tuotteet
router.get(
    "/",
    protectRoute,
    adminRoute,
    getAllProducts
);

// Featured-tuotteet
router.get(
    "/featured",
    getFeaturedProducts
);

// Tuotteet kategorian perusteella
router.get(
    "/category/:category",
    getProductsByCategory
);

// Suositellut tuotteet
router.get(
    "/recommendations",
    getRecommendedProducts
);

// Yksittäinen tuote
router.get(
    "/:id",
    getProductById
);


// ------------------------------------
// TUOTTEIDEN HALLINTA
// ------------------------------------

// Luo tuote
router.post(
    "/",
    protectRoute,
    adminRoute,
    createProduct
);

// Muokkaa tuotetta
router.put(
    "/:id",
    protectRoute,
    adminRoute,
    updateProduct
);

// Featured päälle/pois
router.patch(
    "/:id",
    protectRoute,
    adminRoute,
    toggleFeaturedProduct
);

// Poista tuote
router.delete(
    "/:id",
    protectRoute,
    adminRoute,
    deleteProduct
);


export default router;