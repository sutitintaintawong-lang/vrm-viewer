// ======================================
// AI Avatar Framework v2.0
// Scene
// ======================================

import * as THREE from "../libs/three.module.js";
import { OrbitControls } from "../libs/OrbitControls.js";

import {
    CAMERA,
    RENDERER
} from "./config.js";

export function initScene() {

    // --------------------------
    // Canvas
    // --------------------------

    const canvas = document.getElementById("avatarCanvas");

    // --------------------------
    // Scene
    // --------------------------

    const scene = new THREE.Scene();

    // --------------------------
    // Camera
    // --------------------------

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

    // --------------------------
    // Renderer
    // --------------------------

    const renderer = new THREE.WebGLRenderer({

        canvas,

        alpha: RENDERER.alpha,

        antialias: RENDERER.antialias

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // --------------------------
    // Controls
    // --------------------------

    const controls = new OrbitControls(

        camera,

        renderer.domElement

    );

    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableZoom = false;

    // --------------------------
    // Lights
    // --------------------------

    const ambient = new THREE.AmbientLight(

        0xffffff,

        2

    );

    scene.add(ambient);

    const directional = new THREE.DirectionalLight(

        0xffffff,

        1.5

    );

    directional.position.set(

        1,

        2,

        2

    );

    scene.add(directional);

    const fill = new THREE.DirectionalLight(

        0xffffff,

        0.8

    );

    fill.position.set(

        -2,

        1,

        1

    );

    scene.add(fill);

    // --------------------------
    // Clock
    // --------------------------

    const clock = new THREE.Clock();

    // --------------------------
    // App Object
    // --------------------------

    const app = {

        scene,

        camera,

        renderer,

        controls,

        clock,

        canvas,

        currentVrm: null,

        headBone: null,

        neckBone: null,

        mouse: {

            x: 0,

            y: 0

        },

        speaking: false,

        emotion: "neutral"

    };

    // --------------------------
    // Resize
    // --------------------------

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

    return app;

}
