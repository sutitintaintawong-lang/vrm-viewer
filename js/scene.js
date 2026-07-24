// ======================================
// AI Avatar Framework v2.0
// Scene System
// ======================================

import * as THREE from "three";

export function initScene() {

    const canvas = document.getElementById("avatarCanvas");

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    // กล้องอยู่ด้านหน้าของ Avatar
    camera.position.set(0, 1.45, 1.6);
    camera.lookAt(0, 1.35, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Clock (animation.js ใช้)
    const clock = new THREE.Clock();

    // Mouse (mouse.js ใช้)
    const mouse = new THREE.Vector2();

    // Raycaster (ไว้ใช้ต่อใน LookAt / Click)
    const raycaster = new THREE.Raycaster();

    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 2);
    directional.position.set(0, 3, 3);
    scene.add(directional);

    // Resize
    window.addEventListener("resize", () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    });

    return {

        scene,
        camera,
        renderer,

        clock,
        mouse,
        raycaster,

        currentVrm: null,

        headBone: null,
        neckBone: null,

        mixer: null,
        actions: {},

        delta: 0

    };

}
