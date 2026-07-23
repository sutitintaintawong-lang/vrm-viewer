// ======================================
// AI Avatar Framework v2.0
// Scene System
// ======================================


import * as THREE from "three";



// ======================================
// Init Scene
// ======================================

export function initScene(){


    const canvas =
    document.getElementById(
        "avatarCanvas"
    );



    const scene =
    new THREE.Scene();



    scene.background = null;



    // Camera

    const camera =
    new THREE.PerspectiveCamera(

        30,

        window.innerWidth /
        window.innerHeight,

        0.1,

        100

    );



    /*
       กล้องอยู่หน้า Avatar
       VRM หน้าอยู่ -Z
    */

    camera.position.set(

        0,

        1.45,

        -1.5

    );



    camera.lookAt(

        0,

        1.35,

        0

    );





    // Renderer

    const renderer =
    new THREE.WebGLRenderer({

        canvas,

        alpha:true,

        antialias:true

    });



    renderer.setPixelRatio(
        window.devicePixelRatio
    );


    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );


    renderer.outputColorSpace =
    THREE.SRGBColorSpace;




    // Light

    const light =
    new THREE.DirectionalLight(

        0xffffff,

        2

    );


    light.position.set(

        0,

        3,

        -3

    );


    scene.add(light);



    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            1
        )
    );




    window.addEventListener(
        "resize",
        ()=>{


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




    return {


        scene,

        camera,

        renderer,

        currentVrm:null


    };


}
