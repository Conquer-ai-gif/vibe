import {Sandbox} from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {
  const sandboxId = await step.run('get-sandbox-id', async () => {
    const sandbox = await Sandbox.create('sandbox id')
    return sandbox.sandboxId;
  });

    // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.  You write clean, concise code.you write simple next.js code snippets to solve problems.",
      model: openai({ model: "gpt-4o" }),
    });

    // Run the agent with an input.  This automatically uses steps
    // to call your AI model.
    const { output } = await codeAgent.run(`sumarize the following text:${+ event.data.value} `);

    console.log(output)

    const sandboxUrl = await step.run('get-sandbox-url', async () => {

      const sandbox =await getSandbox(sandboxId);
      const host= sandbox.getHost(3000);
      return `https://${host}`;
    })

  
    return {output,sandboxUrl};
  },
);