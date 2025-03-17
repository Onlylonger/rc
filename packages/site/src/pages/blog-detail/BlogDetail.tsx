import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import "./github.css";

const createMDContent = (year: string, id: string) =>
  lazy(() => import(`./${year}/${id}.mdx`).catch(() => "loading failed"));

const DynamicMDContent = () => {
  const { year, id } = useParams();

  if (!year) return null;
  if (!id) return null;

  const MDContent = createMDContent(year, id);

  console.log(MDContent);

  if (!MDContent) return null;

  return (
    <Suspense fallback="loading...">
      <MDContent />
    </Suspense>
  );
};

export const BlogDetail = () => {
  return (
    <div className="markdown-body">
      <DynamicMDContent />
    </div>
  );
};
