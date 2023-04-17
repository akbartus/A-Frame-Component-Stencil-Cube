AFRAME.registerComponent('stencil-cube', {
    schema: {
        gltfScale: { type: 'number', default: 1 }, // indicate scale of attached gltf file
        gltfPosition: { type: 'vec3', default: { x: 0, y: 0, z: -1 } }, // position
        gltfRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }, // rotation
        applyColor: { type: 'boolean', default: false }, // solid color will be applied to gltf file, else use original texture
        objectColor: { type: 'string', default: 'green' }, // if true shows gltf in green
        planeColor: { type: 'string', default: '#ffffff' }, // color of background of stencil
        gltfUrls: { type: 'array', default: [] }, // links to gltf files for each side
        stencilTransparent: { type: 'boolean', default: false },
        stencilOpacity: { type: 'number', default: 1 } // whether to make the stencil material transparent
    },
    init: function () {
        const clock = new THREE.Clock();
        const scene = this.el.object3D;
        const camera = this.el.sceneEl.camera;
        const data = this.data;

        // LIGHTS
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 10, 7.5);
        dirLight.castShadow = true;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.left = -2;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = -2;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        // RENDERER
        const renderer = this.el.sceneEl.renderer;
        //renderer.setClearColor(0x453C67); // set if necessary to apply sky color

        initPlanes();
        initCube();
        animate();

        function initCube() {
            const addCubeFace = (objectColor, stencilRef, planePos, planeRot, gltfUrl, scale, rotation) => {
                // CUBE FACE
                const planeGeom = new THREE.PlaneGeometry();
                const stencilMat = new THREE.MeshPhongMaterial({ color: data.planeColor });
                stencilMat.depthWrite = false;
                stencilMat.stencilWrite = true;
                stencilMat.stencilRef = stencilRef;
                stencilMat.stencilFunc = THREE.AlwaysStencilFunc;
                stencilMat.stencilZPass = THREE.ReplaceStencilOp;
                if (data.stencilTransparent) {
                    stencilMat.transparent = true;
                    stencilMat.opacity = data.stencilOpacity;
                }
                const stencilMesh = new THREE.Mesh(planeGeom, stencilMat);
                stencilMesh.position.copy(planePos);
                stencilMesh.rotation.x = planeRot.x;
                stencilMesh.rotation.y = planeRot.y;
                stencilMesh.rotation.z = planeRot.z;
                stencilMesh.scale.multiplyScalar(0.9);
                scene.add(stencilMesh);

                if (gltfUrl) {
                    // OBJECT INSIDE CUBE
                    const loader = new THREE.GLTFLoader();
                    loader.load(gltfUrl, function (gltf) {
                        const object = gltf.scene;
                        object.scale.multiplyScalar(scale);
                        object.position.copy(data.gltfPosition);

                        // Rotate object based on face
                        if (stencilRef === 1) {
                            // Front side
                            object.rotation.x = rotation.x;
                            object.rotation.y = rotation.y;
                            object.rotation.z = rotation.z;
                        } else if (stencilRef === 2) {
                            // top side
                            object.rotation.x = rotation.x + Math.PI / 2;
                            object.rotation.y = rotation.y;
                            object.rotation.z = rotation.z;
                        } else if (stencilRef === 3) {
                            // bottom side
                            object.rotation.x = rotation.x - Math.PI / 2;
                            object.rotation.y = rotation.y;
                            object.rotation.z = rotation.z;
                        } else if (stencilRef === 4) {
                            // back side
                            object.rotation.x = rotation.x + Math.PI;
                            object.rotation.y = rotation.y;
                            object.rotation.z = rotation.z;
                        } else if (stencilRef === 5) {
                            // Left side
                            object.rotation.x = rotation.x;
                            object.rotation.y = rotation.y + Math.PI / 2;
                            object.rotation.z = rotation.z;
                        } else if (stencilRef === 6) {
                            // Right side
                            object.rotation.x = rotation.x;
                            object.rotation.y = rotation.y - Math.PI / 2;
                            object.rotation.z = rotation.z;
                        }

                        if (data.applyColor) {
                            // Apply color to the object material
                            const objectMat = object.children[0].material.clone();
                            objectMat.color = new THREE.Color(objectColor);
                            objectMat.stencilWrite = true;
                            objectMat.stencilRef = stencilRef;
                            objectMat.stencilFunc = THREE.EqualStencilFunc;
                            if (stencilMat.transparent && data.stencilTransparent) {
                                objectMat.transparent = true;
                                objectMat.opacity = 1;
                            }
                            object.children[0].material = objectMat;
                        } else {
                            // Use the original material of the object
                            object.traverse(function (child) {
                                if (child.isMesh) {
                                    const originalMat = child.material.clone();
                                    originalMat.stencilWrite = true;
                                    originalMat.stencilRef = stencilRef;
                                    originalMat.stencilFunc = THREE.EqualStencilFunc;
                                    if (stencilMat.transparent && data.stencilTransparent) {
                                        originalMat.transparent = true;
                                        originalMat.opacity = 0.5; // change to 1 if you want originalMaterial be without transparency
                                    }
                                    child.material = originalMat;
                                }
                            });
                        }
                        stencilMesh.add(object);
                    });
                }
            }

            addCubeFace(data.objectColor, 1, new THREE.Vector3(0, 0, 0.45), new THREE.Vector3(0, 0, 0), data.gltfUrls[0], data.gltfScale, data.gltfRotation);
            addCubeFace(data.objectColor, 2, new THREE.Vector3(0, 0.45, 0), new THREE.Vector3(-Math.PI / 2, 0, 0), data.gltfUrls[1], data.gltfScale, data.gltfRotation);
            addCubeFace(data.objectColor, 3, new THREE.Vector3(0, -0.45, 0), new THREE.Vector3(Math.PI / 2, 0, 0), data.gltfUrls[2], data.gltfScale, data.gltfRotation);
            addCubeFace(data.objectColor, 4, new THREE.Vector3(0, 0, -0.45), new THREE.Vector3(Math.PI, 0, 0), data.gltfUrls[3], data.gltfScale, data.gltfRotation);
            addCubeFace(data.objectColor, 5, new THREE.Vector3(-0.45, 0, 0), new THREE.Vector3(0, -Math.PI / 2, 0), data.gltfUrls[4], data.gltfScale, data.gltfRotation);
            addCubeFace(data.objectColor, 6, new THREE.Vector3(0.45, 0, 0), new THREE.Vector3(0, Math.PI / 2, 0), data.gltfUrls[5], data.gltfScale, data.gltfRotation);
        }

        function initPlanes() {
            const planeGeom = new THREE.PlaneGeometry();
            const stencilMat = new THREE.MeshPhongMaterial({ color: data.planeColor });
            stencilMat.depthWrite = false;
            stencilMat.stencilWrite = true;
            stencilMat.stencilRef = 0;
            stencilMat.stencilFunc = THREE.NotEqualStencilFunc;
            stencilMat.stencilFail = THREE.ReplaceStencilOp;
            stencilMat.stencilZFail = THREE.ReplaceStencilOp;
            stencilMat.stencilZPass = THREE.ReplaceStencilOp;
            const planeMesh = new THREE.Mesh(planeGeom, stencilMat);
            planeMesh.position.set(0, 0, 0);
            planeMesh.rotation.x = -Math.PI / 2;
            planeMesh.scale.multiplyScalar(10);
            scene.add(planeMesh);
        }

        function animate() {
            const delta = clock.getDelta();
            if (typeof stencilMesh !== 'undefined' && scene.getObjectById(stencilMesh.id)) {
                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        }
    },
});

// Just in case for tracking
AFRAME.registerComponent("world2local", {
    tick: function () {
        var worldToLocal = new THREE.Matrix4();
        var scene = document.querySelector("a-scene");
        worldToLocal.copy(this.el.object3D.matrixWorld).invert();
        scene.object3D.applyMatrix4(worldToLocal);
    },
});