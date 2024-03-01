const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany({
      where: { completed: false },
    });
    return res.status(200).json(offers);
  } catch (error) {
    return res.status(500).json({ message: "Error while getting offers" });
  }
};

exports.getOfferDetails = async (req, res) => {
  const offerId = req.params.id;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(offerId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            isWorker: true,
          },
        },
      },
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    return res.status(200).json(offer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving offer details." });
  }
};

exports.createOffer = async (req, res) => {
  const { title, description, price, completed} = req.body;
  const userId = req.user.userId;
  try {
    const newOffer = await prisma.offer.create({
      data: {
        title,
        description,
        price,
        userId: parseInt(userId),
        completed,
      },
    });
    return res.status(201).json(newOffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating offer." });
  }
};

exports.updateOffer = async (req, res) => {
  const offerId = req.params.id;
  const { title, description, price, completed} = req.body;
  const userId = req.user.userId;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(offerId) },
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    if (offer.userId !== userId) {
      return res.status(403).json({
        message: "Access denied. Can only update your own offers.",
      });
    }
    const updatedOffer = await prisma.offer.update({
      where: { id: parseInt(offerId) },
      data: {
        title,
        description,
        price,
        completed,
      },
    });
    return res.status(200).json(updatedOffer);
  } catch (error) {
    return res.status(500).json({ message: "Error updating offer." });
  }
};

exports.deleteOffer = async (req, res) => {
  const offerId = req.params.id;
  const userId = req.user.userId;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(offerId) },
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    if (offer.userId !== userId) {
      return res.status(403).json({
        message: "Access denied. Can only delete your own offers.",
      });
    }
    await prisma.offer.delete({
      where: { id: parseInt(offerId) },
    });
    return res.status(200).json({ message: "Offer deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting offer." });
  }
};
