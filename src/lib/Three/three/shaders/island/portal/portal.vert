uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec2 center = vec2(0.5, 0.5);
    float distanceFromCenter = distance(vUv, center);

    float wave = sin(distanceFromCenter * uFrequency - uTime) * uAmplitude;

    vec3 newPosition = position + normal * wave;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
}