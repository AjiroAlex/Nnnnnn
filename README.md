const axios = require('axios');

export default async function handler(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'يرجى كتابة سؤال' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: message,
            model: "gpt-3.5-turbo",
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer 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`
            }
        });

        res.status(200).json({ response: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'حدث خطأ أثناء جلب الرد' });
    }
}
