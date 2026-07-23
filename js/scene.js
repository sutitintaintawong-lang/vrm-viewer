// ======================================
// AI Avatar Framework v2.0
// Scene
// ======================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js";

import {
    CAMERA,
    RENDERER
} from "./config.js";

export function initScene() {

    const canvas = document.getElementById("avatarCanvas");

    const scene = new THREE.Scene();

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

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: RENDERER.alpha,
        antialias: RENDERER.antialias
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableZoom = false;

    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.5);
    directional.position.set(1, 2, 2);
    scene.add(directional);

    const fill = new THREE.DirectionalLight(0xffffff, 0.8);
    fill.position.set(-2, 1, 1);
    scene.add(fill);

    const clock = new THREE.Clock();

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

    window.addEventListener("resize", () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    });

    return app;
}
