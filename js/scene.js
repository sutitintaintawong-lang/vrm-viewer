// ======================================
// AI Avatar Framework v2.0
// Scene System
// ======================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

import {
    CAMERA,
    RENDERER
} from "./config.js";

export function initScene() {

    const canvas = document.getElementById("avatarCanvas");

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
        CAMERA.fov,
        window.innerWidth / window.innerHeight,
        CAMERA.near,
        CAMERA.far
    );

    camera.position.set(
        CAMERA.position.x,
        CAMERA.position.y,
        CAMERA.position.z
    );

    camera.lookAt(0, 1.3, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: RENDERER.alpha,
        antialias: RENDERER.antialias
    });

    renderer.setPixelRatio(RENDERER.pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Ambient
    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            2
        )
    );

    // Main Light
    const light = new THREE.DirectionalLight(
        0xffffff,
        3
    );

    light.position.set(
        0,
        3,
        3
    );

    scene.add(light);

    // Fill Light
    const fill = new THREE.DirectionalLight(
        0xffffff,
        1
    );

    fill.position.set(
        0,
        2,
        -3
    );

    scene.add(fill);

    window.addEventListener("resize", () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

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
