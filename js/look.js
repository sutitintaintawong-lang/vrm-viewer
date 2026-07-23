// ======================================
// AI Avatar Framework v2.0
// Head / Neck Look System
// ======================================

import {
    LOOK
} from "./config.js";


// ======================================
// Update Look (Mouse Tracking)
// ======================================

export function updateLook(app) {


if (
    !app.currentVrm ||
    !app.headBone ||
    !app.neckBone
) {
    return;
}



    // ถ้ามีคำสั่งจาก AI
    // ให้ใช้ targetLook แทนเมาส์

    const target =

        app.targetLook || {

            x: app.mouse.x,

            y: app.mouse.y

        };



    // --------------------------
    // Head
    // --------------------------

    if(app.headBone){


        const targetY =

            target.x *

            LOOK.headYaw;



        const targetX =

            -target.y *

            LOOK.headPitch;



        app.headBone.rotation.y +=

        (

            targetY -

            app.headBone.rotation.y

        )

        *

        LOOK.smooth;



        app.headBone.rotation.x +=

        (

            targetX -

            app.headBone.rotation.x

        )

        *

        LOOK.smooth;


    }



    // --------------------------
    // Neck
    // --------------------------

    if(app.neckBone){


        const targetNeck =

            target.x *

            LOOK.neckYaw;



        app.neckBone.rotation.y +=

        (

            targetNeck -

            app.neckBone.rotation.y

        )

        *

        LOOK.smooth;


    }


}



// ======================================
// Look Front
// ======================================

export function lookFront(app){


    app.targetLook = {

        x:0,

        y:0

    };


}



// ======================================
// Look Left
// ======================================

export function lookLeft(app){


    app.targetLook = {

        x:-0.8,

        y:0

    };


}



// ======================================
// Look Right
// ======================================

export function lookRight(app){


    app.targetLook = {

        x:0.8,

        y:0

    };


}
