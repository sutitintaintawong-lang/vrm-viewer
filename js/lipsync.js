// ======================================
// AI Avatar Framework v2.0
// Lip Sync System
// ======================================


import {
    LIPSYNC
} from "./config.js";



import {
    VRMExpressionPresetName
} from "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.4.0/lib/three-vrm.module.js";



// ======================================
// Start Lip Sync
// ======================================

export function startLipSync(app){


    app.lipSync = {

        active:true,

        time:0

    };


}



// ======================================
// Stop Lip Sync
// ======================================

export function stopLipSync(app){


    if(app.lipSync){

        app.lipSync.active = false;

    }


    setMouth(
        app,
        0
    );


}



// ======================================
// Update Lip Sync
// ======================================

export function updateLipSync(
    app,
    delta
){


    if(!app.currentVrm) return;



    if(
        !app.lipSync ||
        !app.lipSync.active
    ){

        return;

    }



    app.lipSync.time += delta;



    const mouthValue =

        (

            Math.sin(

                app.lipSync.time *

                LIPSYNC.speed

            )

            + 1

        )

        /

        2

        *

        LIPSYNC.amount;



    setMouth(

        app,

        mouthValue

    );


}



// ======================================
// Set Mouth Expression
// ======================================

function setMouth(
    app,
    value
){


    const expressionManager =

        app.currentVrm.expressionManager;



    if(!expressionManager){

        return;

    }



    try {


        // VRM 1.0

        expressionManager.setValue(

            VRMExpressionPresetName.Aa,

            value

        );


    }

    catch(error){


        console.warn(
            "VRM Aa expression not found",
            error
        );



        try {


            // fallback

            expressionManager.setValue(

                "aa",

                value

            );


        }

        catch(error2){


            try {


                expressionManager.setValue(

                    "A",

                    value

                );


            }

            catch(error3){


                console.warn(
                    "Mouth expression unavailable"
                );


            }


        }


    }


}
