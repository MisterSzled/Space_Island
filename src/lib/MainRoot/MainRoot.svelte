<script>
        import { onMount } from "svelte";
        import LoadingBar from "../Components/LoadingBar.svelte";
        import { updateStartStages } from "../stores/state";

        let animationInProgress = false;

        onMount(() => {});

        let startAnimation = () => {
                animationInProgress = true;
                updateStartStages(0);
        };
</script>

<div
        class={"h-full z-10 w-full relative pointer-events-none " +
                (animationInProgress ? "completed_bg" : "") +
                (animationInProgress ? "" : "bg-[rgb(1,1,1,0.75)]")}
>
        <div class="h-full w-full flex z-20">
                <button
                        class={"h-full flex-grow flex text-white justify-center items-center flex-col " +
                                (animationInProgress ? "completed" : "")}
                        class:selected={animationInProgress}
                        on:click={startAnimation}
                        on:keydown={startAnimation}
                >
                        <LoadingBar />
                </button>
        </div>
</div>

<style>
        .fade-out {
                opacity: 0;
                transition: opacity 1.5s ease;
        }

        .completed {
                animation: fade-out 3s linear 0s 1;
                animation-fill-mode: forwards;
        }
        .completed_bg {
                animation: background-color 3s linear 0s 1;
        }

        @keyframes background-color {
                0% {
                        background-color: rgb(1, 1, 1, 0.75);
                }

                100% {
                        background-color: rgb(1, 1, 1, 0);
                        background: none;
                }
        }

        @keyframes fade-out {
                0% {
                        opacity: 1;
                }

                100% {
                        opacity: 0;
                }
        }
</style>
