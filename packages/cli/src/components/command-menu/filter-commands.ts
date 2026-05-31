import { COMMANDS } from "./Commands";
import type { Command } from "./types";

export function getFilteredCommands(query: string): Command[] {
  if(!query.length) return COMMANDS;
  return COMMANDS.filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()));
}
