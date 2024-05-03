import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

/**
 * The main 3D model functionallity is all here 
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingGif = document.querySelector('.loading-container img');

let sceneReady = false

const loadingManager = new THREE.LoadingManager(
// Loaded
() => {
    // Wait a little
    window.setTimeout(() => {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

        // Update loadingBarElement
        loadingBarElement.classList.add('ended')
        loadingBarElement.style.transform = ''

        //  fade out the loading text 
        gsap.to(".loading-text", { duration: 1, opacity: 0, onComplete: () => {
            document.querySelector('.loading-text').style.display = 'none';
            document.querySelector('.loading-container img').style.display = 'none';

        }});
    }, 500)

    window.setTimeout(() => {
        sceneReady = true
    }, 2000)
},


    // Progress bar
    (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)


// Debug 
const debugObject = {}

// Canvas for the 3D model
const canvas = document.querySelector('canvas.webgl')

// Scene creation
const scene = new THREE.Scene()

/**
 * Overlay for geometry
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms: {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map textures
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 2.5

/**
 * Models of hospital buildings
 */
const path = window.location.pathname;
let modelFile = 'rsch.gltf'; // default model

if (path.includes('worthing.html')) {
    modelFile = 'worthing.gltf';
} else if (path.includes('prh.html')) {
    modelFile = 'prh.gltf';
}

gltfLoader.load(
    `/models/${modelFile}`,
    (gltf) => {
        gltf.scene.scale.set(2.5, 2.5, 2.5);
        gltf.scene.rotation.y = Math.PI * 0.5;
        scene.add(gltf.scene);

        updateAllMaterials();
    }
);


/**
 * Points coordinates for results to be displayed from the backend sql database
 * point coordinates order X Y Z
 */
const raycaster = new THREE.Raycaster()
const points = [
    {
        position: new THREE.Vector3(1.64, 1.77, -0.58),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(4.74, -0.55, -6.51),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(3.91, 1.28, 2.89),
        element: document.querySelector('.point-2')
    },
    {
        position: new THREE.Vector3(-3.7, 0.3, -1.7),
        element: document.querySelector('.point-3')
    }
    ,
    {
        position: new THREE.Vector3(-0.96, 0.92, -0.23),
        element: document.querySelector('.point-4')
    }
]

/**
 * Lights for the scene to illuminate the 3D models
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight)

/**
 * Sizes for the 3D models
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera for viewing the 3D models
 */
// Default camera position
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(10.12, 4.0, -3.95)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true  // Enable auto rotate
controls.autoRotateSpeed = -0.1  // Set the rotation speed/direction

/**
 * Renderer for the 3D models
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate the 3D models
 */
const tick = () => {
    // Update controls
    controls.update()

    // Update points only when the scene is ready
    if (sceneReady) {
        // Go through each point
        for (const point of points) {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if (intersects.length === 0) {
                // Show
                point.element.classList.add('visible')
            }

            // Intersect found
            else {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)

                // Intersection is close than the point
                if (intersectionDistance < pointDistance) {
                    // Hide
                    point.element.classList.remove('visible')
                }
                // Intersection is further than the point
                else {
                    // Show
                    point.element.classList.add('visible')
                }
            }
            // Show X Y Z coordinates in DEV browser
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = -screenPosition.y * sizes.height * 0.5
            const translateZ = -screenPosition.z * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
        }
    }

    // Render
    renderer.render(scene, camera)
    // camera position coordinates in DEV browser   
    // console.log('Camera position:', camera.position.x, camera.position.y, camera.position.z);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
