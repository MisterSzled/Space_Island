type TextureObject = {
        name: string;
        type: 'cubeTexture' | 'texture' | 'gltfModel';
        path: string | string[];
};

const textures: TextureObject[] = [
        {
                name: 'rock1',
                type: 'gltfModel',
                path: 'models/rocks/Boulder.glb',
        },
        {
                name: 'rock2',
                type: 'gltfModel',
                path: 'models/rocks/Crystal.glb',
        },

        {
                name: 'island',
                type: 'gltfModel',
                path: 'models/Island/island2.glb',
        },

        {
                name: 'portal',
                type: 'gltfModel',
                path: 'models/Island/portal.glb',
        },

        {
                name: 'noise',
                type: 'texture',
                path: 'textures/noise.jpg',
        },
        {
                name: 'mask',
                type: 'texture',
                path: 'textures/mask.jpg',
        },
];

export default textures;