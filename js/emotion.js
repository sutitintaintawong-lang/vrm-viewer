// ======================================
// AI Avatar Framework v2.0
// Emotion System
// ======================================

import {
    EMOTION
} from "./config.js";

import {
    VRMExpressionPresetName
} from "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js";


// ======================================
// Set Emotion
// ======================================

export function setEmotion(
    app,
    emotion
) {

    if (!app.currentVrm) return;

    const expressionManager =
        app.currentVrm.expressionManager;

    if (!expressionManager) return;

    // Reset ทุก Expression ก่อน
    resetEmotion(expressionManager);

    switch (emotion) {

        case "happy":

            expressionManager.setValue(
                VRMExpressionPresetName.Happy,
                1
            );

            break;

        case "sad":

            expressionManager.setValue(
                VRMExpressionPresetName.Sad,
                1
            );

            break;

        case "surprised":

            expressionManager.setValue(
                VRMExpressionPresetName.Surprised,
                1
            );

            break;

        case "neutral":

            break;

        default:

            console.log(
                "Unknown emotion:",
                emotion
            );

    }

    app.emotion = emotion;

}


// ======================================
// Reset Emotion
// ======================================

function resetEmotion(manager) {

    manager.setValue(
        VRMExpressionPresetName.Happy,
        0
    );

    manager.setValue(
        VRMExpressionPresetName.Sad,
        0
    );

    manager.setValue(
        VRMExpressionPresetName.Surprised,
        0
    );

}
