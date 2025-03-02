import { Button, Drawer } from "@shilong/rc/dev";
import { MenuIcon, XIcon } from "@shilong/rc/dev/icons";

export const MobileMenu = () => {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <Button variant="outline">
          <MenuIcon />
          Menu
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="fixed top-2 right-2 bottom-2 z-10 flex w-[310px] outline-none"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            {
              "--initial-transform": "calc(100% + 8px)",
            } as React.CSSProperties
          }
        >
          <div className="flex h-full w-full grow flex-col rounded-[16px] bg-zinc-50 p-5">
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-2 flex justify-between border-b border-dashed border-border">
                <span className="font-medium text-ring">Menus</span>
                <Drawer.Close asChild className="text-ring">
                  <Button size="icon" variant="ghost">
                    <XIcon />
                  </Button>
                </Drawer.Close>
              </Drawer.Title>
              <div>
                <Button variant="ghost" className="w-full justify-start">
                  Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Blogs
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Introduction
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
