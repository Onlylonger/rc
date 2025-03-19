import { Highlight, HighlightProps, themes } from "prism-react-renderer";

interface DemoBlockProps {
  code: string;
  language?: HighlightProps["language"];
  children?: React.ReactNode;
  theme?: HighlightProps["theme"];
}

export const DemoBlock = (props: DemoBlockProps) => {
  const { code, language = "tsx", children, theme = themes.github } = props;
  return (
    <div>
      <h3 className="text-gray-400">结果展示</h3>
      <div className="border-2 border-border p-10">{children}</div>
      <Highlight theme={theme} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-5">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
