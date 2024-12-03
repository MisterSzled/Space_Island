import * as THREE from 'three';

function flower_lights(flower, resources) {
        const light_power = 0.05;
        const flowerLight_A = new THREE.PointLight(new THREE.Color(214, 0, 225), light_power, 10);
        const flowerLight_B = new THREE.PointLight(new THREE.Color(214, 0, 225), light_power, 10);
        const flowerLight_C = new THREE.PointLight(new THREE.Color(214, 0, 225), light_power, 10);
        const flowerLight_D = new THREE.PointLight(new THREE.Color(214, 0, 225), light_power, 10);

        flowerLight_A.shadow.normalBias = 0.01;
        flowerLight_B.shadow.normalBias = 0.01;
        flowerLight_C.shadow.normalBias = 0.01;
        flowerLight_D.shadow.normalBias = 0.01;

        flowerLight_A.position.copy(flower.position);
        flowerLight_B.position.copy(flower.position);
        flowerLight_C.position.copy(flower.position);
        flowerLight_D.position.copy(flower.position);

        const bump_amt = 0.5;

        flowerLight_A.position.x += bump_amt;
        flowerLight_A.position.y += bump_amt;

        flowerLight_B.position.x += bump_amt;
        flowerLight_B.position.y -= bump_amt;

        flowerLight_C.position.z += bump_amt;
        flowerLight_C.position.y -= bump_amt;

        flowerLight_C.position.z += bump_amt;
        flowerLight_C.position.y += bump_amt;

        resources.island.scene.add(flowerLight_A);
        resources.island.scene.add(flowerLight_B);
        resources.island.scene.add(flowerLight_C);
        resources.island.scene.add(flowerLight_D);
}

export { flower_lights }