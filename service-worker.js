// ======================================
// AI Avatar Framework v2.0
// Service Worker
// ======================================

const CACHE_NAME = "ai-avatar-v2";

const urlsToCache = [

    "./",

    "./index.html",

    "./style.css",

    "./vrm.js",

    "./manifest.json",

    "./avatar.vrm",


    // JS Modules

    "./js/config.js",
    "./js/scene.js",
    "./js/loader.js",
    "./js/mouse.js",
    "./js/look.js",
    "./js/blink.js",
    "./js/idle.js",
    "./js/animation.js",
    "./js/speech.js",
    "./js/lipsync.js",
    "./js/emotion.js",
    "./js/status.js",
    "./js/message.js",


    // Icons

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];


// ======================================
// Install
// ======================================

self.addEventListener(
    "install",
    (event)=>{

        event.waitUntil(

            caches.open(CACHE_NAME)

            .then((cache)=>{

                console.log(
                    "AI Avatar Cache Created"
                );

                return cache.addAll(
                    urlsToCache
                );

            })

        );

    }

);



// ======================================
// Fetch
// ======================================

self.addEventListener(
    "fetch",
    (event)=>{


        event.respondWith(

            caches.match(
                event.request
            )

            .then((response)=>{


                return (

                    response ||

                    fetch(event.request)

                );


            })

        );


    }

);



// ======================================
// Activate
// ======================================

self.addEventListener(
    "activate",
    (event)=>{


        event.waitUntil(

            caches.keys()

            .then((keys)=>{


                return Promise.all(

                    keys.map((key)=>{


                        if(
                            key !== CACHE_NAME
                        ){

                            return caches.delete(
                                key
                            );

                        }


                    })

                );


            })

        );


    }

);
