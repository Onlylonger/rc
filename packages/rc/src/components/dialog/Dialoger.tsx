import { useEffect } from "react";
import { eve } from "../../utils";

enum Events {
  OPEN_DIALOG = "OPEN_DIALOG",
  CLOSE_DIALOG = "CLOSE_DIALOG",
  UPDATE_DIALOG = "UPDATE_DIALOG",
}
type OpenParams = {
  id?: number;
  title: string;
};

const ps = eve<Events>();

let uuid = 1;

export const Dialoger = () => {
  useEffect(() => {
    const handleOpenDialog = (params: OpenParams) => {
      console.log(params);
    };

    ps.on(Events.OPEN_DIALOG, handleOpenDialog);

    return () => {
      ps.off(Events.OPEN_DIALOG, handleOpenDialog);
    };
  }, []);

  return <></>;
};

export const dialog = (params: OpenParams) => {
  const id = params.id ?? uuid++;
  ps.emit(Events.OPEN_DIALOG, {
    params,
    id,
  });
};

dialog.dismiss = function () {
  //
};
