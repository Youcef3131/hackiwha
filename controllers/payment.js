const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany();
        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ message: "Error while getting payments" });
    }
}

exports.getPaymentDetails = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const payment = await prisma.payment.findUnique({
            where: { id: parseInt(paymentId) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        isWorker: true,
                        Offer: true,
                    },
                },
            },
        });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving payment details." });
    }
}

exports.createPayment = async (req, res) => {
    const userId = req.user.userId;
    try {
        const newPayment = await prisma.payment.create({
            data: {
                userId: parseInt(userId),
            },
        });
        return res.status(201).json(newPayment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating payment." });
    }
}