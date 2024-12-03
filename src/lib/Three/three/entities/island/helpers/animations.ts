import * as THREE from 'three';

const looping_clips = ["Flower pulse"];
const animation_map = {
        "Leaf_Rigged": "Radar_Bump_0",
        "Leaf_Rigged001": "Radar_Bump_0",

        "Mesh_18": "Bomb Bump",

        "Mesh_88": "Berry Grow",
        "Mesh_91": "Berry Grow",
        "Mesh_92": "Berry Grow",
        "Mesh_90": "Berry Grow",
        "Mesh_94": "Berry Grow",
        "Mesh_96": "Berry Grow",
        "Mesh_98": "Berry Grow",
        "Mesh_99": "Berry Grow",
        "Mesh_100": "Berry Grow",
        "Mesh_101": "Berry Grow",
        "Mesh_102": "Berry Grow",
        "Berry_Trunk_Frond": "Berry Leaf Bump"
}
const clickAnimations = {};

function setup_animations(resources, animator, camera) {
        resources.island.animations.forEach((clip) => {
                const action = animator.mixer.clipAction(clip, resources.island.scene);
                if (looping_clips.includes(clip.name)) {
                        action.loop = THREE.LoopRepeat;
                        action.play();
                } else {
                        if (!!clickAnimations[clip.name]) {
                                clickAnimations[clip.name].push(action);
                        } else {
                                clickAnimations[clip.name] = [action];
                        }
                }
        });

        window.addEventListener("click", (event) => {
                const mouse = new THREE.Vector2();
                const raycaster = new THREE.Raycaster();

                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(resources.island.scene.children, true);

                intersects.forEach((val) => {
                        if (!!animation_map[val.object.name]) {
                                clickAnimations[animation_map[val.object.name]].forEach(item => {
                                        item.reset();
                                        item.setLoop(THREE.LoopOnce);
                                        item.clampWhenFinished = true;
                                        item.play();
                                })
                        }
                });
        });
}

export { setup_animations }