// ======================================
// AI Avatar Framework v2.0
// Head / Neck Look Tracking
// ======================================

import {
    LOOK
} from "./config.js";


// ======================================
// Update Look
// ======================================

export function updateLook(app) {


    if (!app.currentVrm) return;



    // --------------------------
    // Head Rotation
    // --------------------------

    if (app.headBone) {


        const targetY =

            app.mouse.x *

            LOOK.headYaw;



        const targetX =

            -app.mouse.y *

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
    // Neck Rotation
    // --------------------------

    if (app.neckBone) {


        const targetNeck =

            app.mouse.x *

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
