import * as THREE from "three";

import { get_environment } from "../entities/environment/environment";
import { get_stars } from "../entities/stars/stars";
import { get_asteroids } from "../entities/asteroids/asteroids";
import { get_island } from "../entities/island/island";

import { runConcurrentAnimations } from "./_HELPERS_";
import { get_camera_entity } from "../entities/camera/camera";
import { startStages } from "../../../stores/state";

async function conductor(
        timer: any,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        controls: any,
        renderer: THREE.WebGLRenderer,
        postprocessor: any,
        resources: any,
        animator: any,
        gui: any
) {
        renderer.toneMappingExposure = 0.001;
        postprocessor.bloomPass.strength = 0;

        let camera_entity = get_camera_entity(camera, controls, timer);
        let environment = get_environment(renderer, postprocessor, timer);

        let asteroids = get_asteroids(timer, resources, { asteroid_num: 50, min_radius: 20, max_radius: 30 })
        scene.add(asteroids.mesh);

        let island = get_island(timer, resources, gui, postprocessor, animator, camera);
        scene.add(island.mesh);

        const ambient = new THREE.AmbientLight(0xffffff);
        ambient.intensity = 0.1;

        const entityFolder = gui.addFolder('ambient');
        entityFolder.add(ambient, "intensity", 0, 1, 0.01).name("intensity");

        scene.add(ambient);

        let stars_intro = get_stars(timer, { star_num: 5000, max_z: 400, min_z: 20 });
        let stars_bg = get_stars(timer, { star_num: 2000, max_z: 20, min_z: -150, max_y: 150, max_x: 250, void_radius: 500 });
        scene.add(stars_intro.mesh);
        scene.add(stars_bg.mesh);

        startStages.subscribe((stages) => {
                if (stages.START_STAGE_0) {
                        intro(scene, camera_entity, environment, stars_intro, stars_bg);
                }
        });

        // Debug
        // (() => {
        //         renderer.toneMappingExposure = 1.0;
        //         postprocessor.bloomPass.strength = 0.35;
        //         camera.position.y = 10;
        //         camera.position.z = 10;

        //         controls.target = (new THREE.Vector3(0, 3.1, -18))

        //         scene.remove(stars_intro.mesh);
        //         stars_intro.mesh.geometry.dispose();
        //         stars_intro.mesh.material.dispose();
        // })();
}

async function intro(scene: THREE.Scene, camera_entity: any, environment: any, stars_intro: any, stars_bg: any) {
        await runConcurrentAnimations(
                [environment.animations.toneMapExposure(3000, 1.0)],
                [environment.animations.bloomStrength(3000, 0.35)],
        );
        await runConcurrentAnimations(
                [await stars_intro.animations.strech(2000, 10.0)],
                [await stars_bg.animations.strech(2000, 10.0)],
                [await camera_entity.animations.smooth_translate_and_lookat(2000, new THREE.Vector3(0, 0, 410), new THREE.Vector3(0, 0, 0))],
        );
        await runConcurrentAnimations(
                [await stars_intro.animations.strech(1000, 100.0)],
                [await stars_bg.animations.strech(1000, 100.0)],
                [await camera_entity.animations.smooth_translate_and_lookat(5000, new THREE.Vector3(0, 0, 30), new THREE.Vector3(0, 0, 0))],
        );
        await runConcurrentAnimations(
                [await stars_intro.animations.contract(1000, 1.0)],
                [await stars_bg.animations.contract(1000, 1.0)],
                [await camera_entity.animations.smooth_translate_and_lookat(1000, new THREE.Vector3(0, 0, 25), new THREE.Vector3(0, 0, 0))],
        );

        scene.remove(stars_intro.mesh);
        stars_intro.mesh.geometry.dispose();
        stars_intro.mesh.material.dispose();
}



export { conductor }