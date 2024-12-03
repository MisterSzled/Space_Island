import * as THREE from "three";

import starVertex from "../../shaders/stars/vertex.glsl";
import starFragment from "../../shaders/stars/fragment.glsl";

import { Entity, TweenOptions } from "../_HELPERS_/types";

import { tweenProperty } from "../_HELPERS_/tweener";

function get_stars(timer: any, options?: any): Entity {
        let stars = innit_stars(options);

        const base_updater = () => {
                stars.material.uniforms.uTime.value = timer.getElapsed();
        }

        timer.on("tick", "stars", base_updater);

        let strech = (duration: number, toValue: number, options: TweenOptions = {}): () => Promise<void> => {
                return tweenProperty(
                        stars.material.uniforms.uStrechFactor,
                        'strech',
                        duration,
                        { value: toValue },
                        options,
                        timer
                );
        }

        let contract = (duration: number, toValue: number, options: TweenOptions = {}): () => Promise<void> => {
                return tweenProperty(
                        stars.material.uniforms.uStrechFactor,
                        'contract',
                        duration,
                        { value: toValue },
                        options,
                        timer
                );
        }

        return {
                mesh: stars,
                update_id: "stars",
                base_updater: base_updater,
                animations: {
                        "strech": strech,
                        "contract": contract,
                }
        };
}

function innit_stars(options: any = {}) {
        let sphere_material = new THREE.ShaderMaterial({
                transparent: true,
                depthTest: true,
                uniforms: {
                        uTime: { value: 0.0 },
                        uStrechFactor: { value: 1.0 },
                },
                vertexShader: starVertex,
                fragmentShader: starFragment,
        });

        let cube_num = options.star_num ?? 1000;
        let void_radius = options.void_radius ?? 200;

        let max_x = options.max_x ?? 150;
        let max_y = options.max_y ?? 75;
        let max_z = options.max_z ?? 150;

        let min_x = options.min_x ?? 0;
        let min_y = options.min_y ?? 0;
        let min_z = options.min_z ?? 0;

        const sphere_geometry = new THREE.SphereGeometry();
        const mesh = new THREE.InstancedMesh(sphere_geometry, sphere_material, cube_num);

        mesh.layers.toggle(1);

        let colA = new THREE.Vector3(0.9372549019607843, 0.2784313725490196, 0.43529411764705883);
        let colB = new THREE.Vector3(1, 0.8196078431372549, 0.4);
        let colC = new THREE.Vector3(0.023529411764705882, 0.8392156862745098, 0.6274509803921569);

        const colors = new Float32Array(cube_num * 3);
        const scales = new Float32Array(cube_num);

        const dummy = new THREE.Object3D();
        for (let i = 0; i < cube_num; i++) {

                let x = 0, y = 0;
                while (Math.pow(x, 2) + Math.pow(y, 2) <= void_radius) {
                        x = (Math.random() * max_x) - (max_x / 2);
                        y = (Math.random() * max_y) - (max_y / 2);
                }

                dummy.position.x = x;
                dummy.position.y = y;
                dummy.position.z = min_z + (Math.random() * (max_z - min_z));

                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);

                let col: any;
                let randCol = Math.random();
                if (randCol < 0.33) {
                        col = colA;
                } else if (randCol < 0.66) {
                        col = colB;
                } else {
                        col = colC;
                };

                scales[i] = (Math.random() * 0.15) + 0.01;

                colors[i * 3] = col.x;
                colors[i * 3 + 1] = col.y;
                colors[i * 3 + 2] = col.z;
        }

        mesh.geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));
        mesh.geometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1));

        return mesh;
}

export { get_stars }