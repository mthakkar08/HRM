import CryptoJS from "crypto-js";

const secretPass = "XkhZG4fW2t2W";

export function encryptData(text) {
    let encData = CryptoJS.AES.encrypt(text,secretPass).toString();
    return encData;
};

export function decryptData(text) {    
    let data = CryptoJS.AES.decrypt(text, secretPass).toString(CryptoJS.enc.Utf8);
    return data;
};



