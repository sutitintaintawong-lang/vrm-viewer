// ======================================
// AI Avatar Framework v2.0
// Pose System
// ท่าพนมมือไหว้
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
    // ไหล่ซ้าย
    //
    // กลับด้านจากท่าเดิม
    // ยกแขนขึ้นและหมุนเข้าหาลำตัว
    // ==================================

    if (leftUpperArm) {

        leftUpperArm.rotation.order = "XYZ";

        leftUpperArm.rotation.set(
            0.00,
            0.00,
            -0.85
        );

    }


    // ==================================
    // RIGHT UPPER ARM
    // ไหล่ขวา
    //
    // กลับด้านจากท่าเดิม
    // ยกแขนขึ้นและหมุนเข้าหาลำตัว
    // ==================================

    if (rightUpperArm) {

        rightUpperArm.rotation.order = "XYZ";

        rightUpperArm.rotation.set(
            0.00,
            0.00,
            0.85
        );

    }


    // ==================================
    // LEFT LOWER ARM
    // ท่อนแขนซ้าย
    //
    // พับขึ้นเข้าหาหน้าอก
    // ==================================

    if (leftLowerArm) {

        leftLowerArm.rotation.order = "XYZ";

        leftLowerArm.rotation.set(
            -0.15,
            0.00,
            -1.65
        );

    }


    // ==================================
    // RIGHT LOWER ARM
    // ท่อนแขนขวา
    //
    // พับขึ้นเข้าหาหน้าอก
    // ==================================

    if (rightLowerArm) {

        rightLowerArm.rotation.order = "XYZ";

        rightLowerArm.rotation.set(
            -0.15,
            0.00,
            1.65
        );

    }


    // ==================================
    // LEFT HAND
    // มือซ้าย
    //
    // หันฝ่ามือเข้าหามือขวา
    // ==================================

    if (leftHand) {

        leftHand.rotation.order = "XYZ";

        leftHand.rotation.set(
            0.00,
            0.00,
            -0.15
        );

    }


    // ==================================
    // RIGHT HAND
    // มือขวา
    //
    // หันฝ่ามือเข้าหามือซ้าย
    // ==================================

    if (rightHand) {

        rightHand.rotation.order = "XYZ";

        rightHand.rotation.set(
            0.00,
            0.00,
            0.15
        );

    }

}
