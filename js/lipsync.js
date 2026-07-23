// ======================================
// AI Avatar Framework v2.0
// Lip Sync System
// ======================================

import {
    LIPSYNC
} from "./config.js";

import {
    VRMExpressionPresetName
} from "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js";


// ======================================
// Start Lip Sync
// ======================================

export function startLipSync(app) {


    app.lipSync = {


        active:true,

        time:0


    };


}



// ======================================
// Stop Lip Sync
// ======================================

export function stopLipSync(app) {


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

            +

            1

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

function setMouth(app,value){



    const expressionManager =

        app.currentVrm.expressionManager;



    if(!expressionManager) return;



expressionManager.setValue(
    VRMExpressionPresetName.Aa,
    value
);
    } catch {

        try {

            expressionManager.setValue(
                "aa",
                value
            );

        } catch {

            expressionManager.setValue(
                "A",
                value
            );

        }

    }

}


