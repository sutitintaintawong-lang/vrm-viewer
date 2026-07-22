// ======================================
// AI Avatar Framework v2.0
// Mouse Tracking
// ======================================


export function initMouseTracking(app) {


    window.addEventListener(
        "mousemove",
        (event) => {


            // ตำแหน่ง X

            app.mouse.x =
                (event.clientX /
                window.innerWidth) * 2 - 1;



            // ตำแหน่ง Y

            app.mouse.y =
                (event.clientY /
                window.innerHeight) * 2 - 1;


        }
    );


}
