import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: { env: { VERCEL?: string } };

const base = process.env.VERCEL ? "/" : "/terminal-portfolio/";

export default defineConfig({
  base,
  plugins: [react()],
});
