// ======================================
// AI Avatar Framework v2.0
// Pose System
// ======================================

export function applyIdlePose(vrm) {

    if (!vrm || !vrm.humanoid) return;

    // ==================================
    // Get Bones
    // ==================================

    const leftUpperArm =
        vrm.humanoid.getNormalizedBoneNode(
            "leftUpperArm"
        );

    const rightUpperArm =
        vrm.humanoid.getNormalizedBoneNode(
            "rightUpperArm"
        );

    const leftLowerArm =
        vrm.humanoid.getNormalizedBoneNode(
            "leftLowerArm"
        );

    const rightLowerArm =
        vrm.humanoid.getNormalizedBoneNode(
            "rightLowerArm"
        );

    const leftHand =
        vrm.humanoid.getNormalizedBoneNode(
            "leftHand"
        );

    const rightHand =
        vrm.humanoid.getNormalizedBoneNode(
            "rightHand"
        );


    // ==================================
    // PHA N O M MUE
    // ท่าพนมมือไหว้
    // ==================================

    // ----------------------------------
    // Left Upper Arm
    // ----------------------------------

    if (leftUpperArm) {

        leftUpperArm.rotation.set(
            0.15,
            -0.15,
            0.45
        );

    }


    // ----------------------------------
    // Right Upper Arm
    // ----------------------------------

    if (rightUpperArm) {

        rightUpperArm.rotation.set(
            0.15,
            0.15,
            -0.45
        );

    }


    // ==================================
    // Lower Arms
    // ==================================

    // ----------------------------------
    // Left Lower Arm
    // ----------------------------------

    if (leftLowerArm) {

        leftLowerArm.rotation.set(
            -0.20,
            0.00,
            -0.85
        );

    }


    // ----------------------------------
    // Right Lower Arm
    // ----------------------------------

    if (rightLowerArm) {

        rightLowerArm.rotation.set(
            -0.20,
            0.00,
            0.85
        );

    }


    // ==================================
    // Hands
    // ==================================

    // ----------------------------------
    // Left Hand
    // ----------------------------------

    if (leftHand) {

        leftHand.rotation.set(
            0.00,
            0.00,
            -0.15
        );

    }


    // ----------------------------------
    // Right Hand
    // ----------------------------------

    if (rightHand) {

        rightHand.rotation.set(
            0.00,
            0.00,
            0.15
        );

    }

}
