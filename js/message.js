// ======================================
// AI Avatar Framework v2.0
// Message API
// ======================================

import {
    setEmotion
} from "./emotion.js";

import {
    setStatus
} from "./status.js";

import {
    speak
} from "./speech.js";

import {
    lookFront,
    lookLeft,
    lookRight
} from "./look.js";


// ======================================
// Initialize Message API
// ======================================

export function initMessageAPI(app) {


    window.addEventListener(

        "message",

        async (event)=>{


            const data = event.data;


            if(!data) return;

            if(typeof data !== "object") return;



            console.log(
                "Message Received:",
                data
            );



            switch(data.type){


                case "emotion":

                    setEmotion(
                        app,
                        data.value
                    );

                    break;



                case "lookFront":

                    lookFront(app);

                    break;



                case "lookLeft":

                    lookLeft(app);

                    break;



                case "lookRight":

                    lookRight(app);

                    break;



                case "speak":


                    if(data.emotion){

                        setEmotion(
                            app,
                            data.emotion
                        );

                    }


                    setStatus(
                        "กำลังตอบ...",
                        "#9c27b0"
                    );


                    await speak(
                        app,
                        data.text || ""
                    );


                    setStatus(
                        "พร้อมใช้งาน",
                        "#00cc66"
                    );


                    break;



                case "stopSpeak":


                    speechSynthesis.cancel();


                    app.speaking = false;


                    setStatus(
                        "พร้อมใช้งาน",
                        "#00cc66"
                    );


                    break;



                case "status":

                    setStatus(
                        data.text,
                        data.color
                    );

                    break;



                default:


                    console.log(
                        "Unknown message:",
                        data.type
                    );


            }


        }

    );


}
