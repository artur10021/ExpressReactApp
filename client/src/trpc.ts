import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// здесь могут возникнуть проблемы при использовании синонимов путей (type aliases)
import { AppRouter } from "../../server/src/index";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
