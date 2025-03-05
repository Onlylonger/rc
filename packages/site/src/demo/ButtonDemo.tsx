import { Button } from "@shilong/rc/dev";

export const ButtonDemo = () => {
  return (
    <div>
      <Button>
        {() => {
          return <div>nihao</div>;
        }}
      </Button>
      <Button>demo</Button>
      {/* <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="outline" size="icon">
        <ChevronRight />
      </Button>
      <Button>
        <MailOpen /> Login with Email
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
      <Button
        render={() => {
          const classNames = getButtonClassNames({
            variant: "default",
            size: "default",
          });
          return (
            <a className={classNames} href="/login">
              Login
            </a>
          );
        }}
      ></Button> */}
    </div>
  );
};
