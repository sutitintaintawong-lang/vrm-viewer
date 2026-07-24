// ======================================
// AI Avatar Framework v2.0
// Animation Loop
// ======================================

import { updateLook } from "./look.js";
import { updateBlink } from "./blink.js";
import { updateIdle } from "./idle.js";
import { updateLipSync } from "./lipsync.js";


// ======================================
// Start Animation
// ======================================

export function startAnimation(app) {

    if (!app.clock) {
        console.error("Clock not found.");
        return;
    }

    function animate() {

        requestAnimationFrame(animate);

        const delta = app.clock.getDelta();

        // Update VRM

        if (app.currentVrm) {

            if (typeof app.currentVrm.update === "function") {
                app.currentVrm.update(delta);
            }

        }

        // Look

        try {
            updateLook(app);
        } catch (e) {
            console.warn("Look Error", e);
        }

        // Blink

        try {
            updateBlink(app, delta);
        } catch (e) {
            console.warn("Blink Error", e);
        }

        // Idle

        try {
            updateIdle(app, delta);
        } catch (e) {
            console.warn("Idle Error", e);
        }

        // Lip Sync

        try {
            updateLipSync(app, delta);
        } catch (e) {
            console.warn("LipSync Error", e);
        }

        // Render

        app.renderer.render(
            app.scene,
            app.camera
        );

    }

    animate();

}
