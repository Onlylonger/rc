let uuid = 1;

export const Dialoger = () => {
  return <></>;
};

export const dialog = (params: { id?: number }) => {
  const id = params.id ?? uuid++;
  console.log(id);
};

dialog.dismiss = function () {
  //
};
