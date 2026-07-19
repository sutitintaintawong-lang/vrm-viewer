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
function sendMessage() {

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

    const reply = "ขอบคุณสำหรับข้อความของคุณ ระบบ AI จะถูกเชื่อมต่อในขั้นตอนถัดไป";

    messages.innerHTML += `
        <div style="text-align:left;margin:8px 0;color:#0d6efd;">
            <b>AI:</b> ${reply}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    // ให้ Avatar พูด
    if (window.avatar && window.avatar.speak) {
        await window.avatar.speak(reply);
    }

}, 500);

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
