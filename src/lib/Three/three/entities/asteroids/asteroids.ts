import * as THREE from 'three';

const total_rocks = 500;
const ring_radius = 50;
const ring_tube_radius = 8;
const rock_ratio = 0.2;

function get_asteroids(timer, resources, gui) {
        const model_1 = resources.rock1.scene;
        let model_2 = resources.rock2.scene.children[0];


        const instanceGeometry = new THREE.InstancedBufferGeometry().copy(model_1.children[0].geometry);
        const instanceMaterial = model_1.children[0].material.clone();
        const mesh_1 = new THREE.InstancedMesh(instanceGeometry, instanceMaterial, total_rocks - (total_rocks * rock_ratio));

        const instanceGeometry_2 = new THREE.InstancedBufferGeometry().copy(model_2.children[0].geometry);
        const instanceMaterial_2 = model_2.children[0].material.clone();
        const mesh_2 = new THREE.InstancedMesh(instanceGeometry_2, instanceMaterial_2, total_rocks * rock_ratio);

        mesh_2.layers.toggle(1);

        let rotations = new Array(total_rocks);
        let initialPositions = new Array(total_rocks);
        let initialRotations = new Array(total_rocks);
        let scales = new Array(total_rocks);

        const dummy = new THREE.Object3D();
        for (let i = 0; i < total_rocks; i++) {

                let base_scale = 1;
                if (i < total_rocks * rock_ratio) {
                        base_scale = 1;
                }
                const scale = (base_scale / 10) + ((base_scale / 10) * 9) * Math.random();
                scales[i] = scale;

                let positionValid = false;
                let attempts = 0;
                while (!positionValid && attempts < 100) {
                        const toroidalAngle = Math.random() * Math.PI * 2;
                        const poloidalAngle = Math.random() * Math.PI * 2;

                        let x, y, z;
                        if (Math.random() < 0.2) {
                                let temp_tube_radius = ring_tube_radius * 1.5;
                                x = (ring_radius + Math.cos(poloidalAngle) * temp_tube_radius) * Math.cos(toroidalAngle);
                                y = (ring_radius + Math.cos(poloidalAngle) * temp_tube_radius) * Math.sin(toroidalAngle);
                                z = Math.sin(poloidalAngle) * temp_tube_radius;
                        } else if (Math.random() < 0.1) {
                                let temp_tube_radius = ring_tube_radius * 0.5;
                                x = (ring_radius + Math.cos(poloidalAngle) * temp_tube_radius) * Math.cos(toroidalAngle);
                                y = (ring_radius + Math.cos(poloidalAngle) * temp_tube_radius) * Math.sin(toroidalAngle);
                                z = Math.sin(poloidalAngle) * temp_tube_radius;
                        } else {
                                x = (ring_radius + Math.cos(poloidalAngle) * ring_tube_radius) * Math.cos(toroidalAngle);
                                y = (ring_radius + Math.cos(poloidalAngle) * ring_tube_radius) * Math.sin(toroidalAngle);
                                z = Math.sin(poloidalAngle) * ring_tube_radius;
                        }

                        dummy.position.set(x, y, z);

                        positionValid = true;

                        for (let j = 0; j < i; j++) {
                                const distance = dummy.position.distanceTo(initialPositions[j]);
                                const combinedSize = scales[i] + scales[j];
                                if (distance < combinedSize) {
                                        positionValid = false;
                                        break;
                                }
                        }

                        attempts++;
                }

                if (!positionValid) {
                        dummy.position.set(Math.random() * 20 - 10, 0, Math.random() * 20 - 10);
                }

                initialPositions[i] = dummy.position.clone();
                initialRotations[i] = dummy.rotation.clone();

                dummy.rotation.set(Math.random(), Math.random(), Math.random());

                let render_scale = 1;
                if (i < total_rocks * rock_ratio) {
                        render_scale = 50;
                }
                dummy.scale.set(render_scale, render_scale, render_scale);

                dummy.updateMatrix();

                if (i < total_rocks * rock_ratio) {
                        mesh_2.setMatrixAt(i, dummy.matrix);
                } else {
                        mesh_1.setMatrixAt(i - total_rocks * rock_ratio, dummy.matrix);
                }
        }


        let quartX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), Math.PI / 2);
        let quartZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1).normalize(), -Math.PI / 4);

        mesh_1.applyQuaternion(quartX);
        mesh_1.applyQuaternion(quartZ);
        mesh_2.applyQuaternion(quartX);
        mesh_2.applyQuaternion(quartZ);

        let basis = Math.sqrt(2) / 2
        let spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(basis, basis, 0).normalize(), 0.001);

        const group = new THREE.Group();
        group.add(mesh_1);
        group.add(mesh_2);

        const base_updater = () => {
                group.applyQuaternion(spin);

                mesh_1.instanceMatrix.needsUpdate = true;
                mesh_2.instanceMatrix.needsUpdate = true;
        }

        timer.on("tick", "asteroids", base_updater);

        return {
                mesh: group,
                update_id: "asteroids",
                base_updater: base_updater,
        };
}

export { get_asteroids };