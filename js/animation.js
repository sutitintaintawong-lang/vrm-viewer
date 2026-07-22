// ======================================
// AI Avatar Framework v2.0
// Animation Loop
// ======================================

import {
    updateLook
} from "./look.js";

import {
    updateBlink
} from "./blink.js";

import {
    updateIdle
} from "./idle.js";


// ======================================
// Start Animation
// ======================================

export function startAnimation(app) {


    function animate() {


        requestAnimationFrame(
            animate
        );



        const delta =

            app.clock.getDelta();



        // --------------------------
        // Update VRM
        // --------------------------

        if (app.currentVrm) {


            app.currentVrm.update(
                delta
            );


        }



        // --------------------------
        // Head Tracking
        // --------------------------

        updateLook(
            app
        );



        // --------------------------
        // Blink
        // --------------------------

        updateBlink(

            app,

            delta

        );



        // --------------------------
        // Idle Motion
        // --------------------------

        updateIdle(

            app,

            delta

        );



        // --------------------------
        // Render
        // --------------------------

        app.renderer.render(

            app.scene,

            app.camera

        );


    }



    animate();


}
