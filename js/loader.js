// ======================================
// AI Avatar Framework v2.0
// VRM Loader
// ======================================

import { GLTFLoader } from 
"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js";

import { VRMLoaderPlugin } from 
"https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js";

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


        loader.register((parser)=>{

            return new VRMLoaderPlugin(parser);

        });



        loader.load(

            AVATAR.url,


            (gltf)=>{


const vrm = gltf.userData.vrm;
vrm.scene.rotation.y = Math.PI;
app.currentVrm = vrm;

// หันหน้าเข้ากล้อง
vrm.scene.rotation.y = Math.PI;

app.scene.add(vrm.scene);



                // เพิ่มเข้า Scene

                app.scene.add(

                    vrm.scene

                );



                // --------------------------
                // Position
                // --------------------------

                vrm.scene.position.set(

                    AVATAR.position.x,

                    AVATAR.position.y,

                    AVATAR.position.z

                );



                // --------------------------
                // Scale
                // --------------------------

                vrm.scene.scale.setScalar(

                    AVATAR.scale

                );



                // --------------------------
                // Disable Culling
                // --------------------------

               vrm.scene.traverse((obj) => {

    obj.frustumCulled = false;

    if (obj.isMesh) {

        obj.castShadow = true;
        obj.receiveShadow = true;

    }

});


                // --------------------------
                // Bones
                // --------------------------

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

                        percent+"%"

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
