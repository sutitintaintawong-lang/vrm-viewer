// ======================================
// AI Avatar Framework v2.0
// Mouse Tracking
// ======================================


export function initMouseTracking(app) {


    window.addEventListener(
        "mousemove",
        (event) => {


            // X (-1 ซ้าย / 1 ขวา)

            app.mouse.x =

                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;



            // Y (-1 บน / 1 ล่าง)

            app.mouse.y =

                (
                    event.clientY /
                    window.innerHeight
                ) * 2 - 1;


        }
    );


}
