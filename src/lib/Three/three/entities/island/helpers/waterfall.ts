function initiateDrips(water_drips) {
        water_drips.forEach((drip, index) => {
                drip.seed = Math.random() * Math.PI;
                drip.mesh.position.y += 1.5;
        });
}
function update_drips(water_drips, elapsed) {
        water_drips.forEach((drip) => {
                drip.mesh.position.y += (Math.sin((elapsed / 500) + (drip.seed * 2))) * 0.01;
        });
}

export { initiateDrips, update_drips };