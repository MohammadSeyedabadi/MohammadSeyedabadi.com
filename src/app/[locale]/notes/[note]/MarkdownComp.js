import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownComp({ content }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  );
}
