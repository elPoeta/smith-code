import type { KeyBinding, TextareaRenderable } from "@opentui/core";
import { StatusBar } from "./StatusBar";
import CommandMenu from "./command-menu";
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { useCommandsMenu } from "./command-menu/hooks/use-commands-menu";
import type { Command } from "./command-menu/types";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

export const TEXT_AREA_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
]
export function InputBar({ onSubmit, disabled }: Props) {
  const textareaRef = useRef<TextareaRenderable>(null);
  const onsubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();
  const { commmandQuery, showCommandMenu, selectedIndex, resolveCommand, scrollRef, setSelectedIndex, handlecontentChange } = useCommandsMenu();

  const handleCommandExecute = useCallback((index:number) => {
    const command = resolveCommand(index);
    handleCommand(command)
  }, [selectedIndex, resolveCommand, onSubmit]);

  const handleTextareaContentChange = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    handlecontentChange(textarea.plainText);
  }, [handlecontentChange]);

  const handleSubmit = useCallback(() => {
    if(disabled) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.plainText.trim();
    if (!text.length) return;

    onSubmit(text);
    textarea.setText("");

  }, [disabled, onSubmit])

    ;
  const handleCommand = useCallback((command: Command | undefined) => {
    const textarea = textareaRef.current;
    if (!textarea || !command) return;

    textarea.setText("");

    if(command.action) {
      command.action({
        exit: () => renderer.destroy(),
      });
    } else {
      textarea.insertText(command.value + " ");
    }

  }, [renderer])



  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.onSubmit = () => {
      onsubmitRef.current();
    }
  }, []);

  onsubmitRef.current = () => {
    if (disabled) return;
    if (showCommandMenu) {
      const command = resolveCommand(selectedIndex);
      handleCommand(command);
      return;
    }
    handleSubmit();
  };


  return (
    <box width="auto" alignItems="center">
      <box border={["left"]}
        borderColor="#34d399"
        width="100%"
      >
        <box position="relative" justifyContent="center" paddingX={2} paddingY={1} backgroundColor="#042f2e" width="100%" gap={1}>
          {showCommandMenu && (
            <box
              position="absolute"
              left={0}
              bottom="100%"
              width="100%"
              backgroundColor="#042f2e"
              zIndex={10}
            >

              <CommandMenu
                query={commmandQuery}
                selectedIndex={selectedIndex}
                scrollRef={scrollRef}
                onSelect={setSelectedIndex}
                onExecute={handleCommandExecute}
              />
            </box>
          )}
          <textarea
            ref={textareaRef}
            focused={!disabled}
            placeholder={`Ask anything... "Start building something awesome"`}
            keyBindings={TEXT_AREA_KEY_BINDINGS}
            onContentChange={handleTextareaContentChange}
          />
          <StatusBar />
        </box>
     </box>
    </box>
  );
}
