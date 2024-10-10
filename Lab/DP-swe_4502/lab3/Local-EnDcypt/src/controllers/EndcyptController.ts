const axios = require('axios');

const JAVA_SERVER_URL = process.env.SERVER_URL;


class EncryptController {

    renderEncrypt = async (req: any, res: any) => {
        res.json({ message: 'Rendering from encrypt' });
    };

    renderDecrypt = async (req: any, res: any) => {
        res.json({ message: 'Rendering from decrypt' });
    };

    encrypt = async (req: any, res: any) => {
        try {
            const { data, encryptionType, shiftKey } = req.body;

            const payload = encryptionType.toLowerCase() === "ceasar"
                ? { data, encryptionType, shiftKey }
                : { data, encryptionType };

            const response = await axios.post(`${JAVA_SERVER_URL}/encrypt`, payload);

            res.json({ encryptedData: response.data.encryptedData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error during encryption');
        }
    };

    decrypt = async (req: any, res: any) => {
        try {
            const { encryptedData, encryptionType, shiftKey } = req.body;

            const payload = encryptionType.toLowerCase() === "ceasar"
                ? { encryptedData, encryptionType, shiftKey }
                : { encryptedData, encryptionType };

            const response = await axios.post(`${JAVA_SERVER_URL}/decrypt`, payload);

            res.json({ decryptedData: response.data.decryptedData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error during decryption');
        }
    };

}

module.exports = new EncryptController();