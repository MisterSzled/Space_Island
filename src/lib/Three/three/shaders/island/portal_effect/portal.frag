varying vec2 vUv;
uniform sampler2D perlinnoise;
uniform vec3 color4;
uniform float time;
varying vec3 vNormal;

vec3 rgbcol(vec3 col) {
        return vec3(col.r/255.0,col.g/255.0,col.b/255.0);
}

void main() {
        vec3 noisetex = texture2D(perlinnoise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;    
        gl_FragColor = vec4(noisetex.r);

        if (gl_FragColor.r >= (0.4 + (0.1 * sin(time * 100.)))) {
        gl_FragColor = vec4(rgbcol(color4),1.0);
        } else {
        gl_FragColor = vec4(0.);
        }
}