import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { COMMANDS } from "./Commands";
import { getFilteredCommands } from "./filter-commands";

const MAX_VISIBLE_COMMANDS = 8;
const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map(cmd => cmd.name.length)) +4;

type CommandMenuProps = {
  query: string;
  selectedIndex: number;
  scrollRef: React.RefObject<ScrollBoxRenderable | null>;
  onSelect: (index: number) => void;
  onExecute: (index: number) => void;
}

export default function CommandMenu({ query, selectedIndex, scrollRef, onSelect, onExecute }: CommandMenuProps) {
  const filtered = getFilteredCommands(query);
  const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_COMMANDS);

  if (!filtered.length)) {

    return (
      <box paddingX={1}>
        <text attributes={TextAttributes.DIM}>No matching commands</text>
      </box>
    )
  }

  return (
    <scrollbox ref={scrollRef} height={visibleHeight}>
      {filtered.map((cmd, index) => {
        const isSelected = index === selectedIndex;
        return (
          <box
            key={cmd.name}
            paddingX={1}
            height={1}
            flexDirection="row"
            overflow="hidden"
            backgroundColor={isSelected ? "#22c55e" : undefined}
            onMouseMove={() => onSelect(index)}
            onMouseDown={() => onExecute(index)}
          >
            <box width={COMMAND_COL_WIDTH} flexShrink={0}>
              <text selectable={false} fg={isSelected ? "black" : "white"}>/{cmd.name}</text>
            </box>
            <box flexGrow={1} flexShrink={1} overflow="hidden">
              <text selectable={false} fg={isSelected ? "black" : "gray"}>{cmd.description}</text>
            </box>
          </box>
        )
      })}
    </scrollbox>
  )
}
          >

          </box>
        )
      })}
    </scrollbox>
  )
}
