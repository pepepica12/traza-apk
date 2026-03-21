"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = verifySignature;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
function verifySignature(publicKeyBase64, message, signatureBase64) {
    try {
        const publicKey = Buffer.from(publicKeyBase64, 'base64');
        const signature = Buffer.from(signatureBase64, 'base64');
        const messageBytes = Buffer.from(message, 'utf8');
        return tweetnacl_1.default.sign.detached.verify(messageBytes, signature, publicKey);
    }
    catch (err) {
        return false;
    }
}
