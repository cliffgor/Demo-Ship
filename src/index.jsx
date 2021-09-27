import ForgeUI, { Fragment, Image, IssuePanel, Text, render, useProductContext, useState } from "@forge/ui";
import api, { route } from "@forge/api";

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

  console.log(`Number of comments on this issue: ${comments.length}`);

  return (
    <Fragment>
      <Text>Hello demoship here are the Number of comments on this issue: {comments.length}</Text>
      <Image
        src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif"
        alt="homer"
/>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);