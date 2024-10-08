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
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`  // استخدام المتغير البيئي
            }
        });

        // نص الرد
        const gptResponse = response.data.choices[0].text;

        // HTML لعرض اسم ضفدع متحرك بلون معين
        const animatedFrogName = `
            <style>
                @keyframes colorChange {
                    0% { color: red; }
                    25% { color: yellow; }
                    50% { color: green; }
                    75% { color: blue; }
                    100% { color: purple; }
                }
                .animated-frog {
                    font-size: 24px;
                    font-weight: bold;
                    animation: colorChange 2s infinite;
                }
            </style>
            <div class="animated-frog">ضفدع</div>
        `;

        // إرسال الرد مع النص المتحرك
        res.status(200).send(`
            <div>
                <p>${gptResponse}</p>
                ${animatedFrogName}
            </div>
        `);
    } catch (error) {
        res.status(500).json({ error: 'حدث خطأ أثناء جلب الرد' });
    }
}
