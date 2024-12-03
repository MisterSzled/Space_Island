varying vec3 vColor;

uniform float uTime;

void main() {
        gl_FragColor = vec4(vColor.r, vColor.g, vColor.b, 1.0);
}