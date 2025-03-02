import { Button, Toaster } from "@shilong/rc/dev";

export const ButtonDemo = () => {
  return (
    <div>
      <Button>demo</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Toaster />

      {/* <Button variant="outline" size="icon">
        <ChevronRight />
      </Button>
      <Button>
        <MailOpen /> Login with Email
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button> */}
      <Button>
        {(_, props) => {
          console.log(props);
          return (
            <a className={props?.className} href="/login">
              Login
            </a>
          );
        }}
      </Button>
    </div>
  );
};
