const GEMINI_API_KEY = "ใส่ API KEY ใหม่ของคุณ";

async function askAI(message) {

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    return data.candidates?.[0]?.content?.parts?.[0]?.text
        || "ขออภัย ไม่สามารถตอบได้";
}
// เปิด/ปิดหน้าต่าง AI Chat
function openChat() {
    const chat = document.getElementById("chatBox");

    if (chat.style.display === "block") {
        chat.style.display = "none";
    } else {
        chat.style.display = "block";
        document.getElementById("userInput").focus();
    }
}

// ส่งข้อความ
async function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    const text = input.value.trim();

    if (text === "") return;

    // ข้อความของผู้ใช้
    messages.innerHTML += `
        <div style="text-align:right;margin:8px 0;">
            <b>คุณ:</b> ${text}
        </div>
    `;

    input.value = "";

// คำตอบตัวอย่างของ AI
setTimeout(async () => {
try {

    const reply = await askAI(text);

    messages.innerHTML += `
        <div style="text-align:left;margin:8px 0;color:#0d6efd;">
            <b>AI:</b> ${reply}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    if (window.avatar && window.avatar.speak) {
        await window.avatar.speak(reply);
    }

} catch (err) {

    console.error(err);

    messages.innerHTML += `
        <div style="text-align:left;margin:8px 0;color:red;">
            <b>AI:</b> ไม่สามารถเชื่อมต่อ AI ได้
        </div>
    `;

}

}

// กด Enter เพื่อส่งข้อความ
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("userInput");

    input.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {
            sendMessage();
        }

    });

});
