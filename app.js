// ======================================
// Send Message
// ======================================

async function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    const text = input.value.trim();


    if (!text) return;



    // User Message

    messages.innerHTML += `
        <div style="text-align:right;margin:8px 0;">
            <b>คุณ:</b> ${text}
        </div>
    `;


    input.value = "";


    try {


        // เรียก Gemini

        const reply = await askAI(text);



        // AI Message

        messages.innerHTML += `
            <div style="text-align:left;margin:8px 0;color:#0d6efd;">
                <b>AI:</b> ${reply}
            </div>
        `;



        messages.scrollTop =
        messages.scrollHeight;



        // =============================
        // Avatar Speak
        // =============================

        if (
            window.avatarApp &&
            window.avatarApp.speak
        ){

            await window.avatarApp.speak(reply);

        }
        else {

            console.warn(
                "Avatar speak() not ready"
            );

        }



    } catch(error){


        console.error(
            "sendMessage Error:",
            error
        );



        const errorMessage =
        "ขออภัย ระบบ AI ไม่สามารถตอบได้ในขณะนี้";



        messages.innerHTML += `
            <div style="text-align:left;margin:8px 0;color:red;">
                <b>AI:</b> ${errorMessage}
            </div>
        `;



    }


}
