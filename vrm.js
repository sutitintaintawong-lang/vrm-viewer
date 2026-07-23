// ======================================
// AI Avatar Framework v2.0
// Main Entry
// ======================================

import { initScene } from "./js/scene.js";
import { loadVRM } from "./js/loader.js";
import { initMouseTracking } from "./js/mouse.js";
import { startAnimation } from "./js/animation.js";
import { initMessageAPI } from "./js/message.js";
import { setStatus } from "./js/status.js";


// ======================================
// Initialize
// ======================================

async function init() {

    try {

        setStatus(
            "กำลังโหลด Avatar...",
            "orange"
        );


        const app = initScene();


        await loadVRM(app);


        initMouseTracking(app);


        initMessageAPI(app);


        startAnimation(app);


        setStatus(
            "พร้อมใช้งาน",
            "#00cc66"
        );


        window.avatarApp = app;


    } catch(error) {


        console.error(error);


        setStatus(
            "โหลด Avatar ไม่สำเร็จ",
            "red"
        );

    }

}


init();
