import React from "react";
import { useCounter } from "./store/counter";
import { Button } from "@shilong/rc/dev";

function ClickButton() {
  const count = useCounter((state) => state.count);
  const increaseCount = useCounter((state) => state.increaseCount);

  console.log("useSyncExternalStore ClickButton render");

  return (
    <div>
      <span>{count}</span>
      <Button onClick={() => increaseCount()}>Increase Count</Button>
    </div>
  );
}

function CountCountry() {
  const country = useCounter((state) => state.country);
  const updateCountry = useCounter((state) => state.updateCountry);
  console.log("useSyncExternalStore CountCountry render");

  return (
    <div>
      <span>{country}</span>
      <Button
        className="demo-btn"
        onClick={() => updateCountry(`${Math.random()}`)}
      >
        updateCountry
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ClickButton />
      <CountCountry />
    </>
  );
}
