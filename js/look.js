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


    // ==================================
    // Target Look
    // ==================================
    // ถ้ามีคำสั่งจาก AI
    // ให้ใช้ targetLook แทนเมาส์
    //
    // Mouse:
    // x = ซ้าย / ขวา
    // y = บน / ล่าง
    //
    // เนื่องจาก Avatar ของเรากลับแกน Y
    // จึงต้องกลับเครื่องหมาย Y ตอนนำไปหมุนหัว

    const target =
        app.targetLook || {

            x: app.mouse.x,

            y: app.mouse.y

        };


    // ==================================
    // HEAD
    // ==================================

    if (app.headBone) {


        // ----------------------------------
        // YAW
        // ซ้าย / ขวา
        // ----------------------------------

        const targetY =
            target.x *
            LOOK.headYaw;


        // ----------------------------------
        // PITCH
        // บน / ล่าง
        // ----------------------------------
        //
        // กลับแกน Y
        //
        // เมาส์ขึ้น   → Avatar มองขึ้น
        // เมาส์ลง     → Avatar มองลง
        //
        // ----------------------------------

        const targetX =
            -target.y *
            LOOK.headPitch;


        // ----------------------------------
        // Smooth YAW
        // ----------------------------------

        app.headBone.rotation.y +=

            (
                targetY -
                app.headBone.rotation.y
            )

            *

            LOOK.smooth;


        // ----------------------------------
        // Smooth PITCH
        // ----------------------------------

        app.headBone.rotation.x +=

            (
                targetX -
                app.headBone.rotation.x
            )

            *

            LOOK.smooth;

    }


    // ==================================
    // NECK
    // ==================================

    if (app.neckBone) {


        // ----------------------------------
        // Neck YAW
        // ซ้าย / ขวา
        // ----------------------------------

        const targetNeck =
            target.x *
            LOOK.neckYaw;


        // ----------------------------------
        // Smooth Neck
        // ----------------------------------

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

export function lookFront(app) {

    app.targetLook = {

        x: 0,

        y: 0

    };

}


// ======================================
// Look Left
// ======================================

export function lookLeft(app) {

    app.targetLook = {

        x: -0.8,

        y: 0

    };

}


// ======================================
// Look Right
// ======================================

export function lookRight(app) {

    app.targetLook = {

        x: 0.8,

        y: 0

    };

}
