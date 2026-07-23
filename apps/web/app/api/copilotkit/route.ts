import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import {
  BuiltInAgent,
  convertMessagesToVercelAISDKMessages,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { NextRequest } from "next/server";

const anthropic = createAnthropic({
  apiKey: process.env.MINIMAX_API_KEY,
  baseURL: "https://api.minimax.io/anthropic/v1",
});

const agent = new BuiltInAgent({
  type: "aisdk",
  factory: ({ input, abortSignal }) =>
    streamText({
      model: anthropic("MiniMax-M2.7"),
      messages: convertMessagesToVercelAISDKMessages(input.messages),
      abortSignal,
    }),
});

const runtime = new CopilotRuntime({
  agents: { default: agent },
  runner: new InMemoryAgentRunner(),
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    endpoint: "/api/copilotkit",
  });
  return handleRequest(req);
};
