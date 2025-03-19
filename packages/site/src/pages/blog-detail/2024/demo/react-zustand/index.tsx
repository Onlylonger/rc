import { DemoBlock } from "@blogs/DemoBlock";

import Frame from "./frame";
import frameCode from "./frame?raw";
import Normal from "./normal";
import normalCode from "./normal?raw";
import WithoutSelector from "./self-zustand";
import withoutSelectorCode from "./self-zustand?raw";

export const FrameDemo = () => (
  <DemoBlock language="jsx" code={frameCode}>
    <Frame />
  </DemoBlock>
);

export const NormalDemo = () => (
  <DemoBlock language="jsx" code={normalCode}>
    <Normal />
  </DemoBlock>
);

export const WithoutSelectorDemo = () => (
  <DemoBlock language="jsx" code={withoutSelectorCode}>
    <WithoutSelector />
  </DemoBlock>
);
