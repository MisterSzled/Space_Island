import { writable } from 'svelte/store';

const loadedStages = writable({
        LOADED_STAGE_0: false,
});
const startStages = writable({
        START_STAGE_0: false,
});

function updateLoadedStages(stage) {
        loadedStages.update(loaded => {
                loaded["LOADED_STAGE_" + stage] = !loaded["LOADED_STAGE_" + stage];
                return loaded;
        });
}
function updateStartStages(stage) {
        startStages.update(loaded => {
                loaded["START_STAGE_" + stage] = !loaded["START_STAGE_" + stage];
                return loaded;
        });
}

export { loadedStages, updateLoadedStages, startStages, updateStartStages };