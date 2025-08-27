import express from "express"
import geocodeAddress from "../controllers/geoCodeController";

const router = router.express();

router.get("/address",geocodeAddress)
