import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

let fireflies = [];
const roam_radius = 5;
const firefly_light = 10.0;

function create_firefly(position) {
        const fireflyGroup = new THREE.Group();

        const pointLight = new THREE.PointLight(0xffa500, firefly_light, 10, 2.0);
        pointLight.castShadow = true;
        pointLight.shadow.normalBias = 0.01;

        const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const fireflySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        const anchor = position.clone();
        fireflyGroup.position.copy(anchor);
        pointLight.position.set(0, 2.5, 0);
        fireflySphere.position.copy(pointLight.position);

        fireflyGroup.add(pointLight);
        fireflyGroup.add(fireflySphere);

        return { group: fireflyGroup, anchor, target: anchor.clone() };
}

function create_fireflies(gui, islandBase, numFireflies) {
        let sampler;

        islandBase.traverse((child) => {
                if (child.name === "Island_Grass_Mask") {
                        sampler = new MeshSurfaceSampler(child).build();
                        const position = new THREE.Vector3();
                        const normal = new THREE.Vector3();

                        for (let i = 0; i < numFireflies; i++) {
                                sampler.sample(position, normal);
                                fireflies.push(create_firefly(position));
                        }
                }

                if (child.name === "Bridge_Base") {
                        let position = child.position.clone();
                        fireflies.push(create_firefly(position));

                        position.y = position.y - 3;
                        fireflies.push(create_firefly(position));
                }
        });

        fireflies.forEach((firefly) => islandBase.add(firefly.group));

        const firefly_light_intensity = { value: firefly_light };
        const entityFolder = gui.addFolder("fireflies");
        entityFolder
                .add(firefly_light_intensity, "value", 0, 50)
                .name("Light Intensity")
                .onChange((value) => {
                        fireflies.forEach((firefly) => {
                                const pointLight = firefly.group.children.find((child) => child.isLight);
                                if (pointLight) {
                                        pointLight.intensity = value;
                                }
                        });
                });

        return { flies: fireflies, surface: sampler };
}


function update_fireflies(elapsed) {
        const roamSpeed = 0.05;
        const targetChangeFrequency = 1000;

        fireflies.forEach((firefly, index) => {
                const { group, anchor, target } = firefly;

                if (elapsed % targetChangeFrequency < 16) {
                        target.set(
                                anchor.x + (Math.random() - 0.5) * 2 * roam_radius,
                                anchor.y + (Math.random() - 0.5) * roam_radius,
                                anchor.z + (Math.random() - 0.5) * 2 * roam_radius
                        );
                }

                group.position.lerp(target, roamSpeed);

                const amplitude = 0.5;
                const frequency = 2;
                group.position.y = anchor.y + Math.sin((elapsed / 1000) * frequency + index) * amplitude;

                const pointLight = group.children.find((child) => child.isLight);
                if (pointLight) pointLight.position.set(0, 2.5, 0);
        });
}

export { create_fireflies, update_fireflies }