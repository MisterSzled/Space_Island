import * as THREE from 'three';

const starlight_radius = 60;
const crystal_star_radius = 45;
const orbit_speed_x = 0.0005;
const orbit_speed_z = 0.0005;

let starlight;
let crystal_star;

function create_starlight(islandBase) {
        const starlightGroup = new THREE.Group();

        const sphereGeometry = new THREE.SphereGeometry(0.2, 12, 12);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const starlightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        const pointLight = new THREE.PointLight(0xffa500, 50000.0, 15, 2.0);
        pointLight.shadow.normalBias = 0.1;
        pointLight.castShadow = false;

        starlightGroup.add(starlightSphere);
        starlightGroup.add(pointLight);

        const initialPosition = new THREE.Vector3(
                0,
                starlight_radius,
                -starlight_radius
        );

        starlightGroup.position.copy(initialPosition);
        starlight = { group: starlightGroup, initialPosition };

        islandBase.add(starlight.group);

        const crystalStarGroup = new THREE.Group();
        const crystalPointLight = new THREE.PointLight(0xffffff, 500.0, 15, 2.0);
        crystalPointLight.shadow.normalBias = 0.2;
        crystalPointLight.castShadow = false;

        crystalStarGroup.add(crystalPointLight);

        const crystalStarInitialPosition = new THREE.Vector3(
                0,
                -crystal_star_radius,
                crystal_star_radius
        );

        crystalStarGroup.position.copy(crystalStarInitialPosition);
        crystal_star = { group: crystalStarGroup, initialPosition: crystalStarInitialPosition };

        islandBase.add(crystal_star.group);

        return { starlightGroup, crystalStarGroup };
}

function update_starlight(elapsed) {
        if (!starlight || !crystal_star) return;

        const { group: starlightGroup } = starlight;
        const { group: crystalStarGroup } = crystal_star;

        const angleX = elapsed * orbit_speed_x;
        const angleZ = elapsed * orbit_speed_z;

        starlightGroup.position.set(
                Math.cos(angleX) * starlight_radius,
                40 + (Math.cos(angleX) * 5),
                (Math.sin(angleZ) * starlight_radius) / 1.5
        );
        starlightGroup.lookAt(new THREE.Vector3(0, 0, 0));

        crystalStarGroup.position.set(
                Math.cos(angleX) * crystal_star_radius,
                -40 - (Math.cos(angleX) * 5),
                (Math.sin(angleZ) * crystal_star_radius) / 1.5
        );
        crystalStarGroup.lookAt(new THREE.Vector3(0, 0, 0));
}

export { create_starlight, update_starlight };