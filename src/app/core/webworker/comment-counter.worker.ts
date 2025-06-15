/// <reference lib="webworker" />
// This file is a web worker that counts the number of comments per article.
interface CommentMeta {
  articleId: string;
}

addEventListener('message', ({ data }) => {
  const comments: CommentMeta[] = data;

  const countMap = comments.reduce((acc, comment) => {
    acc[comment.articleId] = (acc[comment.articleId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  postMessage(countMap);
});
