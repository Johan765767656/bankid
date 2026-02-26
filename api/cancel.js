"use strict";

const { BankIdClient, BankIdClientV6 } = require("../lib/bankid");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const useV6 = req.query.v === "6";
    const production = process.env.BANKID_PRODUCTION === "true";

    const clientOptions = {
      production,
      pfx: process.env.BANKID_PFX
        ? Buffer.from(process.env.BANKID_PFX, "base64")
        : undefined,
      passphrase: process.env.BANKID_PASSPHRASE || undefined,
      ca: process.env.BANKID_CA
        ? Buffer.from(process.env.BANKID_CA, "base64")
        : undefined,
    };

    const bankid = useV6
      ? new BankIdClientV6(clientOptions)
      : new BankIdClient(clientOptions);

    const { orderRef } = req.body;
    const response = await bankid.cancel({ orderRef });

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message, code: err.code });
  }
};
