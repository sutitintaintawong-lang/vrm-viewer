// ======================================
// AI Avatar Framework v2.0
// VRM Loader
// ======================================

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

import { GLTFLoader } from
"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js";

import { VRMLoaderPlugin } from
"https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.4.2/lib/three-vrm.module.js";

import {
    AVATAR
} from "./config.js";

import {
    setStatus
} from "./status.js";


// ======================================
// Initial Idle Pose
// ======================================

function applyInitialPose(vrm){

    if(!vrm || !vrm.humanoid){

        console.warn(
            "No humanoid found"
        );

        return;

    }


    // ป้องกัน VRM เขียนทับ Pose
    vrm.humanoid.autoUpdateHumanBones = false;



    const leftShoulder =
        vrm.humanoid.getRawBoneNode(
            "leftShoulder"
        );


    const rightShoulder =
        vrm.humanoid.getRawBoneNode(
            "rightShoulder"
        );


    const leftUpperArm =
        vrm.humanoid.getRawBoneNode(
            "leftUpperArm"
        );


    const rightUpperArm =
        vrm.humanoid.getRawBoneNode(
            "rightUpperArm"
        );


    const leftLowerArm =
        vrm.humanoid.getRawBoneNode(
            "leftLowerArm"
        );


    const rightLowerArm =
        vrm.humanoid.getRawBoneNode(
            "rightLowerArm"
        );


    console.log(
        "Pose Bones",
        {
            leftShoulder,
            rightShoulder,
            leftUpperArm,
            rightUpperArm,
            leftLowerArm,
            rightLowerArm
        }
    );



    // ======================================
    // Shoulder
    // ======================================

    if(leftShoulder){

        leftShoulder.quaternion.setFromEuler(
            new THREE.Euler(
                0,
                0,
                0.10
            )
        );

    }


    if(rightShoulder){

        rightShoulder.quaternion.setFromEuler(
            new THREE.Euler(
                0,
                0,
                -0.10
            )
        );

    }



    // ======================================
    // Upper Arm
    // ลด A-Pose
    // ======================================

    if(leftUpperArm){

        leftUpperArm.quaternion.setFromEuler(
            new THREE.Euler(
                0.15,
                0,
                0.75
            )
        );

    }


    if(rightUpperArm){

        rightUpperArm.quaternion.setFromEuler(
            new THREE.Euler(
                0.15,
                0,
                -0.75
            )
        );

    }



    // ======================================
    // Lower Arm
    // ======================================

    if(leftLowerArm){

        leftLowerArm.quaternion.setFromEuler(
            new THREE.Euler(
                0,
                0,
                -0.35
            )
        );

    }


    if(rightLowerArm){

        rightLowerArm.quaternion.setFromEuler(
            new THREE.Euler(
                0,
                0,
                0.35
            )
        );

    }



    console.log(
        "Idle Pose Applied"
    );

}



// ======================================
// Load VRM
// ======================================

export function loadVRM(app){


    return new Promise((resolve,reject)=>{


        const loader = new GLTFLoader();



        loader.register((parser)=>{

            return new VRMLoaderPlugin(parser);

        });



        loader.load(

            AVATAR.url,


            (gltf)=>{


                const vrm =
                    gltf.userData.vrm;



                if(!vrm){

                    reject(
                        "VRM not found"
                    );

                    return;

                }



                app.currentVrm = vrm;



                /*
                    VRM Front:
                    -Z

                    ไม่หมุน Avatar
                */


                vrm.scene.rotation.set(
                    0,
                    0,
                    0
                );



                app.scene.add(
                    vrm.scene
                );



                console.log(
                    "Children:",
                    app.scene.children
                );



                const box =
                    new THREE.Box3()
                    .setFromObject(
                        vrm.scene
                    );


                console.log(
                    "Bounding Box:",
                    box
                );



                const center =
                    new THREE.Vector3();


                box.getCenter(
                    center
                );


                console.log(
                    "Center:",
                    center
                );



                // Position

                vrm.scene.position.set(

                    AVATAR.position.x,

                    AVATAR.position.y,

                    AVATAR.position.z

                );



                // Scale

                vrm.scene.scale.setScalar(

                    AVATAR.scale

                );



                // Disable culling

                vrm.scene.traverse((obj)=>{


                    obj.frustumCulled = false;



                    if(obj.isMesh){

                        obj.castShadow = true;

                        obj.receiveShadow = true;

                    }


                });



                // ======================================
                // Bones
                // ======================================

                if(vrm.humanoid){


                    app.headBone =

                    vrm.humanoid
                    .getNormalizedBoneNode(
                        "head"
                    );



                    app.neckBone =

                    vrm.humanoid
                    .getNormalizedBoneNode(
                        "neck"
                    );


                }



                // ======================================
                // Apply Idle Pose
                // ======================================

                applyInitialPose(vrm);


                vrm.scene.updateMatrixWorld(true);



                console.log(
                    "VRM Loaded",
                    vrm
                );



                setStatus(
                    "พร้อมใช้งาน",
                    "#00cc66"
                );



                resolve(vrm);



            },


            undefined,


            (error)=>{


                console.error(
                    error
                );


                reject(error);


            }


        );


    });

}
