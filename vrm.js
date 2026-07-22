import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from "./libs/OrbitControls.js";
import { VRMLoaderPlugin } from "./libs/VRMLoaderPlugin.js";

// ============================
// Canvas
// ============================

const canvas = document.getElementById("avatarCanvas");

// ============================
// Scene
// ============================

const scene = new THREE.Scene();

// ============================
// Camera
// ============================

const camera = new THREE.PerspectiveCamera(

30,
window.innerWidth / window.innerHeight,
0.1,
100

);

// ซูมเฉพาะใบหน้า

camera.position.set(

0,
1.45,
0.65

);

// ============================
// Renderer
// ============================

const renderer = new THREE.WebGLRenderer({

canvas,
alpha:true,
antialias:true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

window.innerWidth,
window.innerHeight

);

renderer.outputColorSpace = THREE.SRGBColorSpace;

// ============================
// Controls
// ============================

const controls = new OrbitControls(

camera,
renderer.domElement

);

controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;

// ============================
// Lights
// ============================

// Ambient

const ambient = new THREE.AmbientLight(

0xffffff,
2

);

scene.add(ambient);

// Directional

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

// Fill

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

// ============================
// Clock
// ============================

const clock = new THREE.Clock();

// ============================
// VRM
// ============================

let currentVrm = null;
// ============================
// Load VRM
// ============================

const loader = new GLTFLoader();

loader.register((parser) => {
    return new VRMLoaderPlugin(parser);
});

loader.load(

    "./avatar.vrm",

    (gltf) => {

        currentVrm = gltf.userData.vrm;

        scene.add(currentVrm.scene);
// Get Bones

headBone = currentVrm.humanoid.getNormalizedBoneNode("head");

neckBone = currentVrm.humanoid.getNormalizedBoneNode("neck");
        // ----------------------------
        // Initial Position
        // ----------------------------

        currentVrm.scene.position.set(
            0,
            -1.15,
            0
        );

        // ----------------------------
        // Initial Rotation
        // ----------------------------

        currentVrm.scene.rotation.set(
            0,
            0,
            0
        );

        // ----------------------------
        // Scale
        // ----------------------------

        currentVrm.scene.scale.setScalar(1);

        // ----------------------------
        // Remove unnecessary joints
        // ----------------------------

        currentVrm.scene.traverse((obj) => {

            obj.frustumCulled = false;

        });

        console.log("VRM Loaded");

    },

    (progress) => {

        console.log(
            "Loading :",
            (
                progress.loaded /
                progress.total *
                100
            ).toFixed(0),
            "%"
        );

    },

    (error) => {

        console.error(error);

    }

);

// ============================
// Resize
// ============================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});

// ============================
// Animation Loop
// ============================

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (currentVrm) {

        currentVrm.update(delta);
// Head Tracking

if(headBone){

    headBone.rotation.y +=
        ((mouse.x * 0.35) - headBone.rotation.y) * 0.08;

    headBone.rotation.x +=
        ((-mouse.y * 0.18) - headBone.rotation.x) * 0.08;

}

if(neckBone){

    neckBone.rotation.y +=
        ((mouse.x * 0.12) - neckBone.rotation.y) * 0.08;

}
    }

    renderer.render(

        scene,

        camera

    );

}

animate();
// ============================
// Mouse Tracking
// ============================

const mouse = {

    x: 0,
    y: 0

};

window.addEventListener("mousemove", (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

});

// ============================
// Look At
// ============================

let headBone = null;
let neckBone = null;
