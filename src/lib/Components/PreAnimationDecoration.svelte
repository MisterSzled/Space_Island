<div
        class="bg-malachite h-[2px] top-0 shadow-glow animate-pulse absolute right"
></div>
<div
        class="bg-malachite h-[2px] bottom-0 right-0 shadow-glow animate-pulse absolute right b"
></div>

<div
        class="bg-malachite w-[2px] right-0 shadow-glow animate-pulse absolute down a"
></div>
<div
        class="bg-malachite w-[2px] left-0 bottom-0 shadow-glow animate-pulse absolute down c"
></div>

<style>
        .a {
                animation-delay: 0.25s;
        }
        .b {
                animation-delay: 0.5s;
        }
        .c {
                animation-delay: 0.75s;
        }
        .right {
                animation-duration: 0.25s;
                animation-name: right;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
        }

        @keyframes right {
                from {
                        width: 0;
                }
                to {
                        width: 100%;
                }
        }

        .down {
                animation-duration: 0.25s;
                animation-name: down;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
        }

        @keyframes down {
                from {
                        height: 0;
                }
                to {
                        height: 100%;
                }
        }
</style>
