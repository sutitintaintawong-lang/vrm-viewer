import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
VRMLoaderPlugin,
VRMUtils
} from "@pixiv/three-vrm";

// Canvas
const canvas = document.getElementById("avatarCanvas");

// Renderer
const renderer = new THREE.WebGLRenderer({
canvas,
alpha:true,
antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
window.innerWidth,
420
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(

30,

window.innerWidth / 420,

0.1,

100

);

camera.position.set(
0,
1.45,
2.2
);

// Controls
const controls =
new OrbitControls(
camera,
renderer.domElement
);

controls.target.set(
0,
1.35,
0
);

controls.enableDamping=true;

controls.dampingFactor=.08;

// Lights
const hemi =
new THREE.HemisphereLight(

0xffffff,

0x666666,

1.5

);

scene.add(hemi);

const dir =
new THREE.DirectionalLight(

0xffffff,

2.5

);

dir.position.set(
2,
5,
3
);

dir.castShadow=true;

scene.add(dir);

// Floor
const floor =
new THREE.Mesh(

new THREE.CircleGeometry(
8,
64
),

new THREE.MeshStandardMaterial({

color:0xf2f2f2

})

);

floor.rotation.x =
-Math.PI/2;

floor.position.y=
-1;

scene.add(floor);

// Clock
const clock =
new THREE.Clock();

// Variables

let currentVRM=null;

let mixer=null;

let blinkTimer=0;

let mouseX=0;

let mouseY=0;

let walking=false;

let speaking=false;
// -----------------------------
// Loader
// -----------------------------

const loader = new GLTFLoader();

loader.register((parser) => {
    return new VRMLoaderPlugin(parser);
});

loader.load(

    "./avatar.vrm",

    (gltf) => {

        currentVRM = gltf.userData.vrm;

        if (!currentVRM) {
            console.error("VRM not found");
            return;
        }

        // Optimize
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.removeUnnecessaryJoints(gltf.scene);

        // Rotate VRM0 automatically
        VRMUtils.rotateVRM0(currentVRM);

        scene.add(currentVRM.scene);

        currentVRM.scene.position.set(
            0,
            -1,
            0
        );

        currentVRM.scene.rotation.y =
            Math.PI;

        currentVRM.scene.scale.set(
            1,
            1,
            1
        );

        // Shadow

        currentVRM.scene.traverse((obj) => {

            if (obj.isMesh) {

                obj.castShadow = true;

                obj.receiveShadow = true;

            }

        });

        console.log("Avatar Loaded");

        setupAvatar();

    },

    (progress) => {

        const percent =
            progress.total
                ? (progress.loaded / progress.total * 100).toFixed(0)
                : 0;

        console.log(
            "Loading " + percent + "%"
        );

    },

    (error) => {

        console.error(error);

    }

);


// -----------------------------
// Avatar Initialize
// -----------------------------

function setupAvatar() {

    if (!currentVRM) return;

    // Face camera

    currentVRM.lookAt.target = camera;

    // Initial Expression

    if (currentVRM.expressionManager) {

        currentVRM.expressionManager.setValue(
            "happy",
            0.15
        );

    }

    console.log(
        "Avatar Ready"
    );

}
// -----------------------------
// Animation
// -----------------------------

function updateIdleMotion(time) {

    if (!currentVRM) return;

    const neck =
        currentVRM.humanoid?.getNormalizedBoneNode("neck");

    const spine =
        currentVRM.humanoid?.getNormalizedBoneNode("spine");

    const chest =
        currentVRM.humanoid?.getNormalizedBoneNode("chest");

    if (neck) {

        neck.rotation.x =
            Math.sin(time * 1.5) * 0.03;

        neck.rotation.z =
            Math.cos(time * 1.3) * 0.02;

    }

    if (spine) {

        spine.rotation.z =
            Math.sin(time * 0.8) * 0.015;

    }

    if (chest) {

        chest.rotation.x =
            Math.sin(time * 1.2) * 0.01;

    }

}

// -----------------------------
// Render Loop
// -----------------------------

function animate() {

    requestAnimationFrame(animate);

    const delta =
        clock.getDelta();

    const elapsed =
        clock.elapsedTime;

    controls.update();

    if (currentVRM) {

        currentVRM.update(delta);

        updateIdleMotion(elapsed);

    }

    renderer.render(
        scene,
        camera
    );

}

animate();


// -----------------------------
// Resize
// -----------------------------

window.addEventListener(

    "resize",

    () => {

        renderer.setSize(
            window.innerWidth,
            420
        );

        camera.aspect =
            window.innerWidth / 420;

        camera.updateProjectionMatrix();

    }

);


// -----------------------------
// Mouse Tracking
// -----------------------------

window.addEventListener(

    "mousemove",

    (event) => {

        mouseX =
            (event.clientX /
                window.innerWidth) *
                2 -
            1;

        mouseY =
            (event.clientY /
                window.innerHeight) *
                2 -
            1;

    }

);
// ======================================================
// Part 3 : Lip Sync + Speak + AI Chat + Export
// ======================================================

let speechSynthesisUtterance = null;
let isSpeaking = false;

// ------------------------------------------------------
// Lip Sync
// ------------------------------------------------------

function setMouth(value) {

    if (!currentVrm) return;

    const exp = currentVrm.expressionManager;

    if (!exp) return;

    value = Math.max(0, Math.min(1, value));

    exp.setValue("aa", value);

}

function animateLipSync(duration = 2500) {

    const start = performance.now();

    function frame(now) {

        if (!isSpeaking) {

            setMouth(0);

            return;

        }

        const t = (now - start);

        const v =
            Math.abs(Math.sin(t * 0.02)) * 0.8 +
            Math.random() * 0.15;

        setMouth(v);

        requestAnimationFrame(frame);

    }

    requestAnimationFrame(frame);

}

// ------------------------------------------------------
// Speak()
// ------------------------------------------------------

export function speak(text) {

    return new Promise((resolve) => {

        if (!("speechSynthesis" in window)) {

            console.warn("Speech API not supported");

            resolve();

            return;

        }

        speechSynthesis.cancel();

        speechSynthesisUtterance =
            new SpeechSynthesisUtterance(text);

        speechSynthesisUtterance.lang = "th-TH";

        speechSynthesisUtterance.rate = 1;

        speechSynthesisUtterance.pitch = 1;

        speechSynthesisUtterance.volume = 1;

        isSpeaking = true;

        animateLipSync();

        // ยิ้มเล็กน้อย

        if (currentVrm?.expressionManager) {

            currentVrm.expressionManager.setValue(
                "happy",
                0.25
            );

        }

        speechSynthesisUtterance.onend = () => {

            isSpeaking = false;

            setMouth(0);

            if (currentVrm?.expressionManager) {

                currentVrm.expressionManager.setValue(
                    "happy",
                    0
                );

            }

            resolve();

        };

        speechSynthesis.speak(
            speechSynthesisUtterance
        );

    });

}

// ------------------------------------------------------
// Stop Speak
// ------------------------------------------------------

export function stopSpeak() {

    speechSynthesis.cancel();

    isSpeaking = false;

    setMouth(0);

}

// ------------------------------------------------------
// AI Chat Connector
// ------------------------------------------------------

export async function askAI(message) {

    // เปลี่ยนเป็น API ของคุณ

    const response = await fetch("/api/chat", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify({

            message

        })

    });

    const data = await response.json();

    await speak(data.reply);

    return data.reply;

}

// ------------------------------------------------------
// Avatar API
// ------------------------------------------------------

window.avatar = {

    speak,

    stopSpeak,

    askAI,

    wave,

    thumbsUp,

    point,

    thinking,

    clap,

    startWalking,

    stopWalking

};

// ------------------------------------------------------
// ตัวอย่างการใช้งาน
// ------------------------------------------------------

window.demo = async () => {

    await speak("สวัสดีครับ");

    await speak("ยินดีต้อนรับ");

    wave();

};

// ======================================================
// Update Loop เพิ่มเติม
// ======================================================

const _oldAnimate = animate;

animate = function () {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (currentVrm) {

        currentVrm.update(delta);

        updateBlink();

        updateLookAt();

        updateIdle();

        updateWalking();

    }

    renderer.render(scene, camera);

};
