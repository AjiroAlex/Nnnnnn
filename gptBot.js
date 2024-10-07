const express = require('express');
const app = express();
const path = require('path');

// Middleware لتفعيل الـ JSON
app.use(express.json());
app.use(express.static('public')); // يمكنك الاستغناء عن هذا إذا لم يكن لديك ملفات ثابتة

// نقطة الوصول للصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ضفدع</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                    color: #008000;
                    font-size: 3em;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    transition: color 0.5s;
                }
                body:hover {
                    color: #00FF00;
                }
            </style>
        </head>
        <body>
            <div>ضفدع</div>
        </body>
        </html>
    `);
});

// نقطة الوصول للربط الخاص بك
app.post('/ask', (req, res) => {
    const { message } = req.body;
    const responseMessage = `Your message was: ${message}`; // يمكنك تعديل هذا
    res.json({ response: responseMessage });
});

// بدء السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
