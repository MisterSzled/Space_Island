varying vec2 vUv;
uniform float uTime;
uniform float uWaveFrequency; // New uniform for wave frequency

void main() {
    vUv = uv; // Pass UVs to the fragment shader

    vec3 displacedPosition = position;

    // Compute displacement factor (wave power diminishes toward the base of the grass)
    float dispPower = 1.0 - cos(uv.y * 3.1416 / 2.0);

    // Compute world space position for instancing
    vec4 instanceWorldPosition = instanceMatrix * vec4(position, 1.0); // World space position
    float wave = sin(instanceWorldPosition.z * uWaveFrequency + uTime * 5.0); // Wave propagates along z-axis

    float displacement = wave * (0.1 * dispPower); // Combine wave with displacement power
    displacedPosition.z += displacement;

    csm_Position = displacedPosition;
}
