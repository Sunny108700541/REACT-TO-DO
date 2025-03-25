import axios from "axios";

export const getQuotes = async (req, res) => {
    try {
        const quotes_response = await axios.get("https://zenquotes.io/api/random");
        res.status(200).send(quotes_response.data[0].q);
    } catch (error) {
        res.status(400).send("error : "+ error.message);
    }
};