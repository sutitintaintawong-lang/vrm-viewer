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


                const vrm = gltf.userData.vrm;


                if(!vrm){

                    reject(
                        "VRM not found"
                    );

                    return;

                }



                app.currentVrm = vrm;



                /*
                    VRM มาตรฐาน:
                    หน้า Avatar อยู่ทาง -Z

                    กล้องจะถูกวางด้าน -Z
                    จึงไม่ต้องหมุนโมเดล
                */

                vrm.scene.rotation.set(
                    0,
                    Math.PI,
                    0
                );



                app.scene.add(
                    vrm.scene
                );

console.log("Children:", app.scene.children);

const box = new THREE.Box3().setFromObject(vrm.scene);
console.log("Bounding Box:", box);

const center = new THREE.Vector3();
box.getCenter(center);
console.log("Center:", center);

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



                // Bones

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
