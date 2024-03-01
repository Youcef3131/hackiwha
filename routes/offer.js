const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeWorker } = require("../middlewares/auth");
const OfferControllers = require("../controllers/offer");

router.post(
  "/offer",
  [authenticateToken, authorizeWorker],
  OfferControllers.createOffer
);
router.get("/offers", OfferControllers.getAllOffers);
router.get("/offer/:id", OfferControllers.getOfferDetails);
router.put(
  "/offer/:id",
  [authenticateToken, authorizeWorker],
  OfferControllers.updateOffer
);
router.delete(
  "/offer/:id",
  [authenticateToken, authorizeWorker],
  OfferControllers.deleteOffer
);

module.exports = router;
