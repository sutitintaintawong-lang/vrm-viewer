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
    // LEFT UPPER ARM
    // แขนซ้ายยกเข้าหาลำตัว
    // ==================================

    if (leftUpperArm) {

        leftUpperArm.rotation.order = "XYZ";

        leftUpperArm.rotation.set(
            0.00,
            0.00,
            0.55
        );

    }


    // ==================================
    // RIGHT UPPER ARM
    // แขนขวายกเข้าหาลำตัว
    // ==================================

    if (rightUpperArm) {

        rightUpperArm.rotation.order = "XYZ";

        rightUpperArm.rotation.set(
            0.00,
            0.00,
            -0.55
        );

    }


    // ==================================
    // LEFT LOWER ARM
    // ท่อนแขนซ้ายพับเข้าหาหน้าอก
    // ==================================

    if (leftLowerArm) {

        leftLowerArm.rotation.order = "XYZ";

        leftLowerArm.rotation.set(
            -0.10,
            0.00,
            -1.20
        );

    }


    // ==================================
    // RIGHT LOWER ARM
    // ท่อนแขนขวาพับเข้าหาหน้าอก
    // ==================================

    if (rightLowerArm) {

        rightLowerArm.rotation.order = "XYZ";

        rightLowerArm.rotation.set(
            -0.10,
            0.00,
            1.20
        );

    }


    // ==================================
    // LEFT HAND
    // มือซ้ายหันเข้าหากัน
    // ==================================

    if (leftHand) {

        leftHand.rotation.order = "XYZ";

        leftHand.rotation.set(
            0.00,
            0.00,
            -0.10
        );

    }


    // ==================================
    // RIGHT HAND
    // มือขวาหันเข้าหากัน
    // ==================================

    if (rightHand) {

        rightHand.rotation.order = "XYZ";

        rightHand.rotation.set(
            0.00,
            0.00,
            0.10
        );

    }

}
