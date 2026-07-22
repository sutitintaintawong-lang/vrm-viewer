// ======================================
// AI Avatar Framework v2.0
// Speech System
// ======================================

import {
    setStatus
} from "./status.js";

import {
    startLipSync,
    stopLipSync
} from "./lipsync.js";


// ======================================
// Speak
// ======================================

export function speak(app, text) {


    return new Promise((resolve)=>{


        if(!text){

            resolve();

            return;

        }



        // --------------------------
        // Status
        // --------------------------

        setStatus(

            "กำลังพูด...",

            "#9c27b0"

        );



        // --------------------------
        // Start Mouth Animation
        // --------------------------

        startLipSync(app);



        // --------------------------
        // Browser Voice
        // --------------------------

        const utterance =

            new SpeechSynthesisUtterance(
                text
            );



        // ภาษาไทย

        utterance.lang = "th-TH";



        // ความเร็วเสียง

        utterance.rate = 1;



        // ระดับเสียง

        utterance.pitch = 1;



        // --------------------------
        // Voice Start
        // --------------------------

        utterance.onstart = ()=>{


            app.speaking = true;


        };



        // --------------------------
        // Voice End
        // --------------------------

        utterance.onend = ()=>{


            app.speaking = false;



            stopLipSync(app);



            setStatus(

                "พร้อมใช้งาน",

                "#00cc66"

            );



            resolve();


        };



        // Error

        utterance.onerror = ()=>{


            app.speaking = false;


            stopLipSync(app);



            setStatus(

                "เกิดข้อผิดพลาด",

                "red"

            );



            resolve();


        };



        speechSynthesis.speak(

            utterance

        );


    });


}
