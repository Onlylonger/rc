import "./App.css";

import { ButtonDemo } from "./demo/ButtonDemo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shilong/rc/dev";

function App() {
  return (
    <div className="Root ">
      <ButtonDemo />
      {/* <Dialog /> */}
      <Tooltip>
        {(state) => {
          const { referenceProps, open, floatingProps } = state;
          return (
            <>
              <button {...referenceProps}>nihao</button>

              {open && <div {...floatingProps}>tooltips</div>}
            </>
          );
        }}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>nihao</TooltipTrigger>
        <TooltipContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          numquam corporis porro distinctio voluptas, debitis rerum eius, earum
          est non quam excepturi deleniti nisi ducimus explicabo saepe nostrum,
          assumenda iusto?
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default App;
