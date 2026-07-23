// ======================================
// AI Avatar Framework v2.0
// Config
// ======================================


// ======================================
// Camera
// ======================================

export const CAMERA = {

    fov: 30,

    near: 0.1,

    far: 100,

    position: {

        x: 0,

        y: 1.45,

        z: 0.65

    }

};



// ======================================
// Renderer
// ======================================

export const RENDERER = {

    alpha: true,

    antialias: true

};



// ======================================
// Avatar
// ======================================

export const AVATAR = {

    url: "./avatar.vrm",

    position: {

        x: 0,

        y: -1.15,

        z: 0

    },

    scale: 1

};



// ======================================
// Mouse Tracking
// ======================================

export const LOOK = {

    headYaw: 0.35,

    headPitch: 0.18,

    neckYaw: 0.12,

    smooth: 0.08

};



// ======================================
// Blink
// ======================================

export const BLINK = {

    intervalMin: 2500,

    intervalMax: 5500,

    duration: 0.12

};



// ======================================
// Idle Motion
// ======================================

export const IDLE = {

    breathingSpeed: 2,

    breathingAmount: 0.010,

    swaySpeed: 0.8,

    swayAmount: 0.02

};



// ======================================
// Lip Sync
// ======================================

export const LIPSYNC = {

    speed: 10,

    amount: 0.55

};



// ======================================
// Emotion
// ======================================

export const EMOTION = {

    smooth: 0.08

};



// ======================================
// Status
// ======================================

export const STATUS = {

    loading: "orange",

    ready: "#00cc66",

    listening: "#2196F3",

    thinking: "#ff9800",

    speaking: "#9c27b0",

    error: "#ff3333"

};
