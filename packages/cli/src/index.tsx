import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/Header";
import { InputBar } from "./components/InputBar";

function App() {
  return (
    <box alignItems="center" justifyContent="center" width="100%" height="100%" gap={2} backgroundColor="#0c0a09">
      <Header />
      <box width="100%" maxWidth={78} paddingX={2}>
      <InputBar onSubmit={(text) => console.log(text)} />
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
