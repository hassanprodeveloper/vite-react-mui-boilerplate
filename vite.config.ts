import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/infrastructure/tests.setup.ts",
    },
    resolve: {
      alias: {
        src: resolve(__dirname, "src"),
        pages: resolve(__dirname, "src", "pages"),
        components: resolve(__dirname, "src", "components"),
        context: resolve(__dirname, "src", "context"), // Ensure this matches your folder name
        router: resolve(__dirname, "src", "router"), // Ensure this matches your folder name
        constant: resolve(__dirname, "src", "constant"), // Ensure this matches your folder name
        hooks: resolve(__dirname, "src", "hooks"),
        services: resolve(__dirname, "src", "services"),
        styles: resolve(__dirname, "src", "styles"),
        types: resolve(__dirname, "src", "types"),
        utils: resolve(__dirname, "src", "utils"),
        view: resolve(__dirname, "src", "view"),
        layouts: resolve(__dirname, "src", "layouts"),
        data: resolve(__dirname, "src", "data"),
        lib: resolve(__dirname, "src", "lib"),
        store: resolve(__dirname, "src", "store"),
        assets: resolve(__dirname, "src", "assets"),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
  };
});
