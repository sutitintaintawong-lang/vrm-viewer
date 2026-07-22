// ======================================
// AI Avatar Framework v2.0
// Idle Animation
// ======================================

import {
    IDLE
} from "./config.js";


// ======================================
// Initialize Idle
// ======================================

export function initIdle(app) {


    app.idle = {

        time: 0,

        baseY: null,

        baseRotationY: null

    };


}



// ======================================
// Update Idle
// ======================================

export function updateIdle(app, delta) {


    if (!app.currentVrm) return;



    if (!app.idle) {

        initIdle(app);

    }



    const idle = app.idle;



    idle.time += delta;



    const model =

        app.currentVrm.scene;



    // บันทึกตำแหน่งเริ่มต้น

    if (idle.baseY === null) {


        idle.baseY =

            model.position.y;


    }



    if (idle.baseRotationY === null) {


        idle.baseRotationY =

            model.rotation.y;


    }



    // --------------------------
    // Breathing
    // --------------------------

    const breathing =

        Math.sin(

            idle.time *

            IDLE.breathingSpeed

        )

        *

        IDLE.breathingAmount;



    model.position.y =

        idle.baseY +

        breathing;



    // --------------------------
    // Body Sway
    // --------------------------

    const sway =

        Math.sin(

            idle.time *

            IDLE.swaySpeed

        )

        *

        IDLE.swayAmount;



    model.rotation.z = sway;



}
