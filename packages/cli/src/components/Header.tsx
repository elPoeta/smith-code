import { TextAttributes } from "@opentui/core";

export function Header() {
  return (
  <box justifyContent="center" alignItems="center">
    <box flexDirection="row" justifyContent="center" alignItems="flex-end" gap={1}>
      <ascii-font font="tiny" text="smith" color="#22c55e" />
      <ascii-font font="tiny" text="code" color="#022c22" />
      </box>
    </box>
  );
}
