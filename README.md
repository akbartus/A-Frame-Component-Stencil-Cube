# A-Frame Component: Stencil Cube
<img alt="Screenshot" src="img/screenshot_1.jpg" width="300">
<img alt="Screenshot" src="img/screenshot_2.jpg" width="300">

### **Description / Rationale**
This is a component, which demonstrates stencil buffer feature enabled through Three.Js library and A-Frame. With the stencil buffer you can hide or show parts of mesh objects. The given component creates a magic cube, where each cube face shows or hides certain 3D models. The project was inspired by Tamani Coding (Genka)'s <a href="https://github.com/tamani-coding/threejs-stencil-buffer-example">work</a>. The component can be used in product demonstration and other creative undertakings.   

### **Instructions**
To see the component at work add "stencil-cube" component to any empty entity. The component has the following attributes: 

* gltfScale: { type: 'number', default: 1 } - indicate scale of attached gltf file.
* gltfPosition: { type: 'vec3', default: { x: 0, y: 0, z: -1 } } - position of attached gltf file.
* gltfRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } } - rotation of attached gltf file.
* applyColor: { type: 'boolean', default: false } - if solid color must be applied to a gltf file, else it uses original texture/color of the file.
* objectColor: { type: 'string', default: 'green' } - if true applies solid color to all gltf files.
* planeColor: { type: 'string', default: '#ffffff' } - the color of the background of stencil.
* gltfUrls: { type: 'array', default: [] } - url to a gltf file, which appears inside stencil. If no url is porovided, (i.e. ",") then it will not show gltf for that stencil.
* stencilTransparent: { type: 'boolean', default: false } - if enabled, makes stencil background transparent.
* stencilOpacity: { type: 'number', default: 1 } - if "stencilTransparent" is enabled, then transparency can be changed (accepts value from 0 to 1).

Example implementation is given below. Image target is in "img" folder:
```
<html>
<head>
    <script src='https://aframe.io/releases/1.4.1/aframe.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.1/dist/mindar-image-aframe.prod.js"></script>
    <script src="js/stencil-cube-component.js"></script>
</head>
<body>
    <a-scene
        mindar-image='imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind;'
        vr-mode-ui='enabled: false' device-orientation-permission-ui='enabled: false'>
        <a-camera id="myCam" position='0 0 0' look-controls='enabled: false'></a-camera>
        <a-entity id="myTarget" mindar-image-target='targetIndex: 0'>
            <a-entity 
                stencil-cube="gltfUrls: 3d/bunny_blue.glb, , , 3d/bunny_white.glb, 3d/bunny_green.glb, 3d/bunny_red.glb; gltfScale: 4; gltfPosition: 0 -0.5 -0.5; gltfRotation: 0 0 0;"
                position="0 0 0" 
                scale="0.5 0.5 0.5"></a-entity>
        </a-entity>
    </a-scene>
</body>
</html>
```


### **Tech Stack**
The project is powered by MindAR.js, AFrame and Three.js. 3D model of the bunny was taken from <a href="http://graphics.stanford.edu/data/3Dscanrep/" >here</a> 

### **Demo**
See demo of the component here: [Demo](https://stencil-cube.glitch.me/)
