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
                    
                // ----------------------
                // Look Front
                // ----------------------

                case "lookFront":

                    lookFront(app);

                    break;



                // ----------------------
                // Look Left
                // ----------------------

                case "lookLeft":

                    lookLeft(app);

                    break;



                // ----------------------
                // Look Right
                // ----------------------

                case "lookRight":

                    lookRight(app);

                    break;



                // ----------------------
                // Speak
                // ----------------------

                case "speak":


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



                // ----------------------
                // Status
                // ----------------------

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
