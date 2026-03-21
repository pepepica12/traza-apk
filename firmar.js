const nacl = require("tweetnacl");

const privateKeyBase64 = "73VFxe7laP7p1N5S22D3GuTCdOJwQ0CO9COJhJKHqEq5qq3ob9dWdrPz/jZQtIIvoxznNCQD8n02Rd/LZS4sQA==";
const privateKey = Buffer.from(privateKeyBase64, "base64");

const message = JSON.stringify({ hola: "alma" });
const signature = nacl.sign.detached(Buffer.from(message), privateKey);

console.log("SIGNATURE_BASE64:");
console.log(Buffer.from(signature).toString("base64"));
