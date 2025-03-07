import "./App.css";

import { ButtonDemo } from "./demo/ButtonDemo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shilong/rc/dev";

function App() {
  return (
    <div className="Root ">
      <ButtonDemo />
      <Tooltip>
        {(params) => {
          const { referenceProps, open, floatingProps } = params;
          return (
            <>
              <button {...referenceProps}>nihao</button>

              {open && <div {...floatingProps}>tooltips</div>}
            </>
          );
        }}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          {(params) => {
            const { referenceProps } = params;
            return (
              <a
                href=""
                {...referenceProps}
                style={Object.assign(referenceProps.style ?? {}, {
                  color: "red",
                })}
              >
                lianjie
              </a>
            );
          }}
        </TooltipTrigger>
        <TooltipContent>
          {(params) => {
            const { floatingProps } = params;
            return (
              <section
                {...floatingProps}
                style={Object.assign(floatingProps.style, { color: "red" })}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                numquam corporis porro distinctio voluptas, debitis rerum eius,
                earum est non quam excepturi deleniti nisi ducimus explicabo
                saepe nostrum, assumenda iusto?
              </section>
            );
          }}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default App;
