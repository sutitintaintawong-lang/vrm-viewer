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

// เริ่มระบบ
async function init() {

    setStatus("กำลังโหลด Avatar...", "orange");

    // สร้าง Scene
    const app = initScene();

    // โหลด VRM
    await loadVRM(app);

    // เปิด Mouse Tracking
    initMouseTracking(app);

    // เปิด Message API
    initMessageAPI(app);

    // เริ่ม Animation
    startAnimation(app);

    setStatus("พร้อมใช้งาน", "#00cc66");

}

init();
