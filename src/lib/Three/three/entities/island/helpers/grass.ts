import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import grassVert from "../../../shaders/island/grass/grass.vert?raw";

let grass_material;

function create_grass(islandBase, numGrassBlades) {
        const vertices = new Float32Array([
                0, 0, 0,
                0.25, 1.25, 0,
                0.5, 0, 0
        ]);

        const indices = new Uint16Array([
                0, 1, 2
        ]);

        const uvs = new Float32Array([
                0, 0,
                0.5, 1,
                1, 0
        ]);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();

        grass_material = new CustomShaderMaterial<THREE.MeshPhysicalMaterial>({
                baseMaterial: THREE.MeshPhysicalMaterial,

                vertexShader: grassVert,
                uniforms: {
                        uTime: { value: 0.0 },
                        uWaveFrequency: { value: 0.5 },
                },

                color: 0x4ca64c,
                side: THREE.DoubleSide,
                roughness: 0.8,
                metalness: 0.1,
        });
        grass_material.castShadow = true;
        grass_material.receiveShadow = true;

        const instancedGrass = new THREE.InstancedMesh(geometry, grass_material, numGrassBlades);
        instancedGrass.castShadow = true;
        instancedGrass.receiveShadow = true;

        const dummy = new THREE.Object3D();
        islandBase.traverse((child) => {
                if (child.name === "Island_Grass_Mask") {
                        const sampler = new MeshSurfaceSampler(child).build();
                        const position = new THREE.Vector3();
                        const normal = new THREE.Vector3();

                        for (let i = 0; i < numGrassBlades; i++) {
                                sampler.sample(position, normal);

                                position.z += 0.5;
                                dummy.position.copy(position);
                                dummy.scale.setScalar(0.5 + Math.random() * 0.5);
                                dummy.rotation.set(0, 0, 0);

                                dummy.updateMatrix();
                                instancedGrass.setMatrixAt(i, dummy.matrix);
                        }
                }
        });

        islandBase.add(instancedGrass);

        return { mesh: instancedGrass, material: grass_material };
}

function update_grass(elapsed) {
        grass_material.uniforms.uTime.value = elapsed / 3000;
        grass_material.uniformsNeedUpdate = true;
}

export { create_grass, update_grass }