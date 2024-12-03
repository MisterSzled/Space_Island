import * as THREE from 'three';

import portalFrag from "../../../shaders/island/portal/portal.frag?raw";
import portalVert from "../../../shaders/island/portal/portal.vert?raw";

let portal;

function create_portal(resources, portalMesh) {
        const portalMaterial = new THREE.ShaderMaterial({
                uniforms: {
                        uColorStart: { value: new THREE.Color(214, 0, 225) },
                        uColorEnd: { value: new THREE.Color(245, 45, 255) },
                        uTime: { value: 0.0 },
                        uFrequency: { value: 100.0 },
                        uAmplitude: { value: 0.3 },
                        uFadeDistance: { value: 0.1 },
                },
                vertexShader: portalVert,
                fragmentShader: portalFrag,
                transparent: true,
                depthWrite: true,
                side: THREE.DoubleSide
        });

        portalMesh.material = portalMaterial;

        const portalLight = new THREE.PointLight(portalMaterial.uniforms.uColorStart.value, 1.5, 10);
        portalLight.shadow.normalBias = 0.015;

        portalLight.position.copy(portalMesh.position);
        resources.island.scene.add(portalLight);

        let res = { mesh: resources.portal.scene, material: portalMaterial, light: portalLight }
        portal = res;
        return res;
}

function update_portal(elapsed) {
        if (!!portal) {
                portal.material.uniforms.uTime.value = elapsed / 1000;
                portal.material.uniformsNeedUpdate = true;
        }
}

export { create_portal, update_portal }