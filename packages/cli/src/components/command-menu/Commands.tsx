import type { Command } from "./types";

export const COMMANDS: Command[] = [
  { name: "new", description: "Start a new conversation", value: "/new" },
  { name: "agents", description: "Switch agents", value: "/agents" },
  { name: "models", description: "Select AI model for generation", value: "/models" },
  { name: "sessions", description: "Browse past sessions", value: "/sessions" },
  { name: "theme", description: "Change color theme", value: "/theme" },
  {
    name: "exit", description: "Quit the application", value: "/exit", action: (ctx) => {
    ctx.exit();
  } },
];
