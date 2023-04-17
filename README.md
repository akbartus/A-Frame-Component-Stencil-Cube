# MindAR.Js Related Component: Stencil Cube
<img alt="Screenshot" src="img/screenshot.jpg" width="600">

### **Description / Rationale**
This is a component, which which demonstrates stencil buffer feature enabled through Three.Js library and A-Frame. With the stencil buffer you can hide or show parts of mesh objects. The given component creates a magic cube, where each cube face shows or hides certain 3D models. The project was inspired by Tamani Coding (Genka)'s <a href="https://github.com/tamani-coding/threejs-stencil-buffer-example">work</a>.  

### **Instructions**
To see the component at work add "stencil-cube" component to any empty entity. The component has the following attributes: 

* gltfScale: { type: 'number', default: 1 } - indicate scale of attached gltf file
* gltfPosition: { type: 'vec3', default: { x: 0, y: 0, z: -1 } } - position of attached gltf files
* gltfRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } } - rotation of attached gltf files
* applyColor: { type: 'boolean', default: false } - if solid color must be applied to a gltf file, else it uses original texture/color of gltf file
* objectColor: { type: 'string', default: 'green' } - if true applies solid color to all gltf files
* planeColor: { type: 'string', default: '#ffffff' } - the color of the background of stencil
* gltfUrls: { type: 'array', default: [] } - link/s to gltf files, which appear inside each stencil
* stencilTransparent: { type: 'boolean', default: false } - if enabled, makes stencil background transparent
* stencilOpacity: { type: 'number', default: 1 } - if "stencilTransparent" is inabled, then transparency can be changed (accepts value from 0 to 1).

```
websurface="url:https://www.youtube.com/embed/L6iKapYgN94; width:3.5; height:2.0;"
```
Target image for tracking is located at "img" folder. Also make sure to reference custom AFrame Websurfaces component, available at "js" folder.

### **Tech Stack**
The project is powered by MindAR.js, AFrame and Three.js. CSS3d Renderer features are made available through Websurfaces component.

<b>Please note:</b> CSS3d will not work in web VR mode!

### **Demo**
To see the application at work: [Demo application](https://webar-youtube.glitch.me/)
