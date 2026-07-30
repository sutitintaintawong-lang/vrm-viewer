// ======================================
// AI Avatar Framework v2.0
// Pose System
// ======================================

export function applyIdlePose(vrm) {

    if (!vrm || !vrm.humanoid) return;

    const leftUpperArm =
        vrm.humanoid.getNormalizedBoneNode("leftUpperArm");

    const rightUpperArm =
        vrm.humanoid.getNormalizedBoneNode("rightUpperArm");

    const leftLowerArm =
        vrm.humanoid.getNormalizedBoneNode("leftLowerArm");

    const rightLowerArm =
        vrm.humanoid.getNormalizedBoneNode("rightLowerArm");

    const leftHand =
        vrm.humanoid.getNormalizedBoneNode("leftHand");

    const rightHand =
        vrm.humanoid.getNormalizedBoneNode("rightHand");


    // -----------------------------
    // Upper Arm
    // -----------------------------

    if (leftUpperArm) {

        leftUpperArm.rotation.set(
            0.15,
            0.00,
            0.95
        );

    }

    if (rightUpperArm) {

        rightUpperArm.rotation.set(
            0.15,
            0.00,
            -0.95
        );

    }


    // -----------------------------
    // Lower Arm
    // -----------------------------

    if (leftLowerArm) {

        leftLowerArm.rotation.set(
            0.00,
            0.00,
            -0.30
        );

    }

    if (rightLowerArm) {

        rightLowerArm.rotation.set(
            0.00,
            0.00,
            0.30
        );

    }


    // -----------------------------
    // Hand
    // -----------------------------

    if (leftHand) {

        leftHand.rotation.set(
            0.10,
            0.00,
            0.00
        );

    }

    if (rightHand) {

        rightHand.rotation.set(
            0.10,
            0.00,
            0.00
        );

    }

}
