// ======================================
// AI Avatar Framework v2.0
// Emotion System
// ======================================

import {
    EMOTION
} from "./config.js";


// ======================================
// Set Emotion
// ======================================

export function setEmotion(
    app,
    emotion
) {


    if(!app.currentVrm) return;


    if(!app.currentVrm.expressionManager)
        return;



    const expressionManager =

        app.currentVrm.expressionManager;



    // Reset ทุก Expression ก่อน

    resetEmotion(

        expressionManager

    );



    switch(emotion){


        case "happy":


            expressionManager.setValue(

                "happy",

                1

            );

            break;



        case "sad":


            expressionManager.setValue(

                "sad",

                1

            );

            break;



        case "surprised":


            expressionManager.setValue(

                "surprised",

                1

            );

            break;



        case "neutral":


            break;



        default:


            console.log(

                "Unknown emotion:",

                emotion

            );


    }



    app.emotion = emotion;


}



// ======================================
// Reset Emotion
// ======================================

function resetEmotion(manager){


    manager.setValue(

        "happy",

        0

    );


    manager.setValue(

        "sad",

        0

    );


    manager.setValue(

        "surprised",

        0

    );


}
