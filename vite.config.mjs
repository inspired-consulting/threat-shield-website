import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import tailwindcss from "@tailwindcss/vite";

const root = resolve(import.meta.dirname, "src");

export default {
    root,
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(root, "index.html"),
                imprint: resolve(root, "imprint.html"),
                terms: resolve(root, "terms.html"),
                privacy: resolve(root, "privacy.html"),
                docs: resolve(root, "documentation.html"),
            },
        },
    },
    plugins: [
        tailwindcss(),
        handlebars({
            partialDirectory: resolve(root, "partials"),
        }),
    ],
    server: {
        port: 8000,
    },
};
