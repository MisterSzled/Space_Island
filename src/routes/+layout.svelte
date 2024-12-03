<script>
        import "../app.postcss";
</script>

<main
        class="m-0 p-0 h-screen w-screen left-0 top-0 overflow-hidden fixed flex justify-center items-center bg-vampire"
>
        <slot />
</main>

<style>
        @font-face {
                font-family: "Novamono";
                src: url("/fonts/novamono.ttf") format("truetype");
                font-weight: normal;
                font-style: normal;
        }

        * {
                font-family: "Novamono", sans-serif !important;
        }
</style>
