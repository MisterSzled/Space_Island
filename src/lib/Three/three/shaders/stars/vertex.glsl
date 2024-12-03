uniform float uTime;
uniform float uStrechFactor;

attribute vec3 aColor;
attribute float aScale;

varying vec3 vColor;

void main() {
        vec4 augged_pos = vec4(position * aScale * (1.0 + sin(uTime / 1000.0) / 5.0), 1.0);

        augged_pos.z *= uStrechFactor;
        
        vec4 modelPosition = modelMatrix * augged_pos * aScale;
        // vec4 modelPosition = modelMatrix * vec4(position * aScale, 1.0);

        gl_Position = projectionMatrix * viewMatrix * instanceMatrix * modelPosition;

        vColor = aColor;
}