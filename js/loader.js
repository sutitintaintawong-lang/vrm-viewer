// ======================================
// AI Avatar Framework v2.0
// VRM Loader (CDN Version)
// ======================================

import { GLTFLoader } 
from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js";


import { VRMLoaderPlugin } 
from "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.4.0/lib/three-vrm.module.js";


import {
    AVATAR
} from "./config.js";


import {
    setStatus
} from "./status.js";


// ======================================
// Load VRM
// ======================================

export function loadVRM(app) {


    return new Promise((resolve, reject) => {


        const loader = new GLTFLoader();


        // Register VRM Plugin

        loader.register((parser)=>{

            return new VRMLoaderPlugin(parser);

        });



        loader.load(

            AVATAR.url,


            (gltf)=>{


                const vrm = gltf.userData.vrm;



                if(!vrm){

                    console.error(
                        "VRM data not found"
                    );

                    reject(
                        "VRM missing"
                    );

                    return;

                }



                app.currentVrm = vrm;



                // หันหน้า Avatar

                vrm.scene.rotation.y = Math.PI;



                // เพิ่มเข้า Scene

                app.scene.add(
                    vrm.scene
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



                // ปิด frustum culling

                vrm.scene.traverse((obj)=>{


                    obj.frustumCulled = false;


                    if(obj.isMesh){

                        obj.castShadow = true;

                        obj.receiveShadow = true;

                    }


                });



                // Bone reference

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


            (progress)=>{


                if(progress.total){


                    const percent =

                    (
                        progress.loaded /
                        progress.total *
                        100

                    ).toFixed(0);



                    console.log(
                        "Loading VRM",
                        percent + "%"
                    );

                }


            },


            (error)=>{


                console.error(
                    "VRM Load Error",
                    error
                );


                setStatus(
                    "โหลด Avatar ไม่สำเร็จ",
                    "red"
                );


                reject(error);


            }


        );


    });


}
