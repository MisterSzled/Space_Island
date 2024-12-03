import * as THREE from 'three';
import { flower_lights } from "./helpers/flower_lights";
import { create_portal, update_portal } from "./helpers/portal";
import { create_grass, update_grass } from "./helpers/grass";
import { create_fireflies, update_fireflies } from "./helpers/fireflies";
import { setup_animations } from "./helpers/animations";
import { initiateDrips, update_drips } from "./helpers/waterfall";
import { create_starlight, update_starlight } from "./helpers/starlight";

function applyCustomMaterialsToMeshes(island) {
    island.traverse((child) => {
        if (child.isMesh && child.material) {
            if (["Island_Base", "Chair_Rock", "Monitor Screen"].includes(child.name)) {
                child.layers.toggle(1);
            }
            if (child.name === "Island_Grass_Mask") {
                child.visible = false;
            }
        }
        child.castShadow = true;
        child.receiveShadow = true;
    });
}

function get_island(timer, resources, gui, postprocessor, animator, camera) {
    const islandBase = resources.island.scene;
    islandBase.castShadow = true;
    islandBase.receiveShadow = true;

    create_grass(islandBase, 50000);
    create_fireflies(gui, islandBase, 5);
    create_starlight(islandBase);

    let water_drips = [];

    islandBase.traverse((child) => {
        if (child.name === "Portal") {
            create_portal(resources, child);
        }

        if (child.name === "Flower_Rig") {
            flower_lights(child, resources);
        }

        if (child.name.includes("Water_Drip")) {
            water_drips.push({ mesh: child });
        }
    });

    initiateDrips(water_drips);

    applyCustomMaterialsToMeshes(islandBase);
    setup_animations(resources, animator, camera);

    const group = new THREE.Group();
    group.add(islandBase);
    group.scale.set(0.4, 0.4, 0.4);

    const bobFrequency = 1;
    const updateIsland = () => {
        const elapsed = timer.getElapsed();
        group.position.y = -Math.abs(Math.sin((elapsed / 10000) * bobFrequency));

        update_portal(elapsed);
        update_fireflies(elapsed);
        update_starlight(elapsed);
        update_grass(elapsed);
        update_drips(water_drips, elapsed);
    };
    timer.on("tick", "station", updateIsland);

    return { mesh: group };
}

export { get_island };
