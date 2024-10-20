import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
    baseUrl: "http://localhost:5173", // Change this to match your Vite server URL
  },
});
