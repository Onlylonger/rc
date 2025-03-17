import { WithLinkButton } from "../../layout/app/WithLinkButton";
import blogsList from "virtual:scan-list";

console.log(blogsList);

const List = () => {
  return (
    <div>
      {blogsList.map((v) => {
        if (!v.children) return;
        const haveBlogs = v.children.length > 0;

        return (
          <section key={v.name}>
            <h2>{v.name}</h2>
            {haveBlogs && (
              <ul>
                {v.children.map((blog) => (
                  <li key={blog.name}>
                    <WithLinkButton
                      to={`./${v.name}/${blog.name.split(".")[0]}`}
                    >
                      {blog.frontmatter?.title || blog.name.split(".")[0]}
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
