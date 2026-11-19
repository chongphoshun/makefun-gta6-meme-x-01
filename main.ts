import { copyFileSync, mkdirSync } from "node:fs";
mkdirSync("/output", { recursive: true });
copyFileSync("POST.json", "/output/POST.json");
