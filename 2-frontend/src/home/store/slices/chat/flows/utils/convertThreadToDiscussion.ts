export function convertThreadToDiscussion(threadedRun: any) {
  const discussion: any = [];

  threadedRun
    .sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
    .forEach((run: any) => {
      const { input, response, id: run_id } = run;

      // Add user and assistant messages from input.content
      if (Array.isArray(input?.content)) {
        input.content.forEach((msg: any) => {
          if (msg.role === 'assistant') {
            discussion.push({
              role: 'assistant',
              content: msg.content,
              metaData: {
                run_id,
                thread: msg.metaData?.thread ?? null,
              },
              actions: msg.actions ?? [],
            });
          } else {
            discussion.push({
              role: msg.role,
              content: msg.content,
            });
          }
        });
      }

      // Add assistant response from run.response
      if (response) {
        try {
          const parsed = JSON.parse(response);
          if (parsed.assistantResponse) {
            discussion.push({
              role: 'assistant',
              content: parsed.assistantResponse,
              metaData: {
                run_id,
                thread:
                  run.input?.content?.find((m: any) => m.role === 'assistant')
                    ?.metaData?.thread ?? null,
              },
              actions: parsed.actions ?? [],
            });
          }
        } catch (e) {
          console.warn(`Failed to parse response JSON in run ${run_id}`, e);
        }
      }
    });

  return discussion;
}
