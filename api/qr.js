"use strict";

const { QrGenerator } = require("../lib/qrgenerator");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { orderRef } = req.body;

    if (!orderRef) {
      return res.status(400).json({ error: "Missing required field: orderRef" });
    }

    const qrCode = await QrGenerator.latestQrFromCache(orderRef);

    if (!qrCode) {
      return res.status(404).json({ error: "No QR code found for this orderRef. It may have expired." });
    }

    return res.status(200).json({ qrCode });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
};
