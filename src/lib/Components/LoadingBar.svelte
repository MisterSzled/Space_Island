<script>
        import TextScramble from "./TextScramble.svelte";
        import { loadedStages } from "../stores/state";
        import { onMount } from "svelte";

        let text = "...Loading...";

        onMount(() => {
                const unsubscribe = loadedStages.subscribe((stages) => {
                        if (stages["LOADED_STAGE_0"]) {
                                text = "Start";
                        }
                });

                return unsubscribe;
        });
</script>

<p class="animate text-xl flex justify-center">
        <TextScramble {text} />
</p>

<style>
        @keyframes load {
                0% {
                        opacity: 0.2;
                        filter: blur(2px);
                }
                100% {
                        opacity: 1;
                }
        }

        .animate {
                display: flex;
                justify-content: center;
                align-items: center;
                animation: load 1.2s infinite 0s ease-in-out;
                animation-direction: alternate;
                text-shadow: 0 0 1px white;
        }
</style>
