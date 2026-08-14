// ======================================
// AI Avatar Framework v2.0
// Scene System
// ======================================

import * as THREE from "three";

import {
    CAMERA,
    RENDERER
} from "./config.js";

export function initScene() {

    const canvas =
        document.getElementById("avatarCanvas");

    const scene =
        new THREE.Scene();

    // ==================================
    // Transparent Background
    // ==================================

    scene.background = null;


    // ==================================
    // Camera
    // ==================================

    const camera =
        new THREE.PerspectiveCamera(
            CAMERA.fov,
            window.innerWidth /
            window.innerHeight,
            CAMERA.near,
            CAMERA.far
        );


    // ==================================
    // Camera Position
    // ==================================
    // ลดตำแหน่งกล้องลง
    // เพื่อให้ Avatar อยู่ต่ำลงในหน้าจอ

    camera.position.set(
        0,
        1.10,
        1.6
    );


    // ==================================
    // Camera Look At
    // ==================================
    // ลดจุดมองลงจาก 1.30 → 1.15

    camera.lookAt(
        0,
        1.3,
        0
    );


    // ==================================
    // Renderer
    // ==================================

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            alpha: RENDERER.alpha,
            antialias: RENDERER.antialias
        });

    renderer.setPixelRatio(
        RENDERER.pixelRatio
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    // ==================================
    // Clock
    // ==================================

    const clock =
        new THREE.Clock();


    // ==================================
    // Mouse
    // ==================================

    const mouse =
        new THREE.Vector2();


    // ==================================
    // Raycaster
    // ==================================

    const raycaster =
        new THREE.Raycaster();


    // ==================================
    // Ambient Light
    // ==================================

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );

    scene.add(
        ambientLight
    );


    // ==================================
    // Front Light
    // ==================================

    const light =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    light.position.set(
        0,
        3,
        -3
    );

    scene.add(
        light
    );


    // ==================================
    // Back Fill
    // ==================================

    const fill =
        new THREE.DirectionalLight(
            0xffffff,
            1
        );

    fill.position.set(
        0,
        2,
        3
    );

    scene.add(
        fill
    );


    // ==================================
    // Resize
    // ==================================

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );


    // ==================================
    // Return Scene System
    // ==================================

    return {

        scene,

        camera,

        renderer,

        clock,

        mouse,

        raycaster,


        // ==================================
        // VRM
        // ==================================

        currentVrm: null,


        // ==================================
        // Bones
        // ==================================

        headBone: null,

        neckBone: null,


        // ==================================
        // Animation
        // ==================================

        mixer: null,

        actions: {},


        // ==================================
        // Delta Time
        // ==================================

        delta: 0

    };

}
