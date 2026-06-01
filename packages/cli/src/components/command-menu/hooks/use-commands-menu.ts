import type { ScrollBoxRenderable } from "@opentui/core";
import type { Command } from "../types";
import { useMemo, useRef, useState } from "react";
import { getFilteredCommands } from "../filter-commands";
import { useKeyboard } from "@opentui/react";

type UseCammnandMenuReturn = {
  showCommandMenu: boolean;
  commmandQuery: string;
  selectedIndex: number;
  scrollRef: React.RefObject<ScrollBoxRenderable | null>;
  handlecontentChange: (text: string) => void;
  resolveCommand: (index: number) => Command | undefined;
  setSelectedIndex: (index: number) => void;
}

export function useCommandsMenu(): UseCammnandMenuReturn {
  const [textValue, setTextValue] = useState("");
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollBoxRenderable | null>(null);

  const commmandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";
  const filteredCommands = useMemo(() => getFilteredCommands(commmandQuery), [commmandQuery]);

  const handlecontentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    const scrollBox = scrollRef.current;
    if (scrollBox) {
      scrollBox.scrollTo(0);
    }

    const prefix = text.trim().startsWith("/") ? text.trim().slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }

  };

  const resolveCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command) {
      setShowCommandMenu(false);
    }
    return command;
  };

  useKeyboard((key) => {
    if (!showCommandMenu) return;

    if (key.name === "escape") {
      key.preventDefault();
      setShowCommandMenu(false);
    } else if (key.name === "up") {
       key.preventDefault();
      setSelectedIndex((prev) => {
        const newIndex = Math.max(0, prev - 1);
        const scrollBox = scrollRef.current;
        if (scrollBox && newIndex < scrollBox.scrollTop) {
          scrollBox.scrollTo(newIndex);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
       key.preventDefault();
      setSelectedIndex((prev) => {
        if (!filteredCommands.length) return 0;

        const newIndex = Math.min(filteredCommands.length - 1, prev + 1);
        const scrollBox = scrollRef.current;
        if (scrollBox) {
          const viewportHeight = scrollBox.viewport.height;
          const visibleEnd = scrollBox.scrollTop + viewportHeight - 1;
          if (newIndex > visibleEnd) {
            scrollBox.scrollTo(newIndex - viewportHeight + 1);
          }
        }
        return newIndex;
      });
    }
  });
  return {
    showCommandMenu,
    commmandQuery,
    selectedIndex,
    scrollRef,
    handlecontentChange,
    resolveCommand,
    setSelectedIndex,
  };
}
