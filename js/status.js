// ======================================
// AI Avatar Framework v2.0
// Status System
// ======================================


// ======================================
// Set Status
// ======================================

export function setStatus(text, color) {


    const statusText =
        document.getElementById(
            "statusText"
        );


    const statusDot =
        document.getElementById(
            "statusDot"
        );



    if (statusText) {

        statusText.textContent = text;

    }



    if (statusDot) {

        statusDot.style.backgroundColor = color;

    }


}
