<script>
        import { onMount } from "svelte";
        import anime from "animejs";

        let el;
        export let text;
        let show_text = false;
        let animeInstance = null;

        let random_char = () => {
                const possible =
                        // "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ" +
                        // "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" +
                        // "абвгдеёжзийклмнопрстуфхцчшщъыьэюя" +
                        "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
                        "0123456789" +
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                        "abcdefghijklmnopqrstuvwxyz";
                return possible.charAt(
                        Math.floor(Math.random() * possible.length),
                );
        };

        let mask = (chars, progress) => {
                const masked = [];

                for (let i = 0; i < chars.length; i++) {
                        const position = (i + 1) / chars.length;
                        if (position > progress) {
                                masked.push(random_char());
                        } else {
                                masked.push(chars[i]);
                        }
                }

                return masked.join("");
        };

        const shuffle = (el) => {
                const chars = el.textContent.split("");

                const params = {
                        progress: 0,
                };

                animeInstance = anime({
                        targets: params,
                        progress: 1,
                        delay: 1000,
                        duration: 1000,
                        easing: "easeInQuad",
                        update: () => {
                                el.textContent = mask(chars, params.progress);
                        },
                        complete: () => {
                                el.classList.add("completed");
                        },
                });
        };

        $: {
                if (show_text) {
                        el.textContent = text;
                        shuffle(el);
                }
        }

        onMount(() => {
                show_text = true;
                shuffle(el);
        });
</script>

<div
        bind:this={el}
        class={"shuffle text-white text-8xl cursor-pointer pointer-events-auto " +
                (show_text ? "" : "hidden")}
></div>

<style>
        div {
                font-family: "Novamono", sans-serif !important;
        }
        .shuffle:hover {
                color: #fff;
                text-shadow: 0 0 1rem #fff;
        }
        .completed {
                animation: blink 1s linear 0s 1 alternate;
                text-decoration: underline;
        }

        @keyframes blink {
                0% {
                        color: #fff;
                        text-shadow: 0 0 1rem #fff;
                }
        }
</style>
