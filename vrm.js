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

        setStatus("กำลังโหลด Avatar...", "orange");

        // สร้าง Scene
        const app = initScene();

        // โหลด Avatar
        await loadVRM(app);

        // เปิดระบบ Mouse Tracking
        initMouseTracking(app);

        // เปิด Message API
        initMessageAPI(app);

        // เริ่ม Animation Loop
        startAnimation(app);

        setStatus("พร้อมใช้งาน", "#00cc66");

        // Debug
        window.avatarApp = app;

    } catch (error) {

        console.error(error);

        setStatus(
            "โหลด Avatar ไม่สำเร็จ",
            "red"
        );

    }

}

init();
