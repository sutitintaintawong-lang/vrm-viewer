// ======================================
// AI Avatar Framework v2.0
// Blink System
// ======================================

import {
    BLINK
} from "./config.js";


// ======================================
// Initialize Blink
// ======================================

export function initBlink(app) {


    app.blink = {

        value: 0,

        target: 0,

        timer: 0,

        nextBlink:
            randomBlinkTime(),

        duration: 0


    };


}



// ======================================
// Update Blink
// ======================================

export function updateBlink(app, delta) {


    if (!app.currentVrm) return;


    if (!app.blink) {

        initBlink(app);

    }



    const blink = app.blink;



    blink.timer += delta;



    // ถึงเวลาพริบตา

    if (

        blink.timer >= blink.nextBlink

    ) {


        blink.timer = 0;


        blink.nextBlink =
            randomBlinkTime();


        blink.target = 1;


        blink.duration = 0;


    }



    // กำลังปิดตา

    if (blink.target === 1) {


        blink.duration += delta;



        if (

            blink.duration >= BLINK.duration

        ) {


            blink.target = 0;


        }


    }



    // Smooth

    blink.value +=

        (

            blink.target -

            blink.value

        )

        *

        0.35;



    setBlinkValue(

        app,

        blink.value

    );


}



// ======================================
// Set Eye BlendShape
// ======================================

function setBlinkValue(app,value){


    const expressionManager =

        app.currentVrm.expressionManager;



    if (!expressionManager) return;



    expressionManager.setValue(

        "blink",

        value

    );


}



// ======================================
// Random Time
// ======================================

function randomBlinkTime(){


    return (

        Math.random()

        *

        (

            BLINK.intervalMax -

            BLINK.intervalMin

        )

        +

        BLINK.intervalMin

    )

    /

    1000;


}
