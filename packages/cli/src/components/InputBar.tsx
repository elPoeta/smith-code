import type { KeyBinding } from "@opentui/core";
import { StatusBar } from "./StatusBar";

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
  return (
    <box width="auto" alignItems="center">
      <box border={["left"]}
        borderColor="#34d399"
        width="100%"
      >
        <box position="relative" justifyContent="center" paddingX={2} paddingY={1} backgroundColor="#042f2e" width="100%" gap={1}>
          <textarea
            focused={!disabled}
            placeholder={`Ask anything... "Start building something awesome"`}
            keyBindings={TEXT_AREA_KEY_BINDINGS}
          />
          <StatusBar />
        </box>
     </box>
    </box>
  );
}
