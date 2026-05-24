import { StatusBar } from "./StatusBar";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

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
          />
          <StatusBar />
        </box>
     </box>
    </box>
  );
}
