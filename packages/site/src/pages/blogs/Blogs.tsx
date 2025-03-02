import { WithLinkButton } from "../../layout/app/WithLinkButton";

const List = () => {
  const list = [
    {
      year: 2024,
      blogs: [
        {
          title: "Utils · classNames",
          desc: "",
        },
        {
          title: "Utils · classVariance",
          desc: "",
        },
        {
          title: "Hooks · usePrevious & useCompareEffect",
          desc: "",
        },
        {
          title: "Hooks · useRequest",
          desc: "",
        },
      ],
    },
  ];

  return (
    <div>
      {list.map((v) => {
        const haveBlogs = v.blogs.length > 0;

        return (
          <section>
            <h2>{v.year}</h2>
            {haveBlogs && (
              <ul>
                {v.blogs.map((blog) => (
                  <li>
                    <WithLinkButton to={`./${blog.title}`}>
                      {blog.title}
                    </WithLinkButton>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
};

export const Blogs = () => {
  return (
    <>
      blogs
      <List />
    </>
  );
};
