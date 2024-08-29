// import { AnthropicVertex } from "@anthropic-ai/vertex-sdk";
// import { GoogleAuth } from "google-auth-library";

// const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const projectId = process.env.Vertex_Ai_ProjectID
// const region = process.env.Vertex_Ai_Location

// const auth = new GoogleAuth({
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
//   credentials: {
//     "private_key": GOOGLE_CLIENT_SECRET!.split(String.raw`\n`).join('\n'),
//     "client_email": GOOGLE_CLIENT_EMAIL
//   }
// });

// export const anthropic = new AnthropicVertex({
//   projectId,
//   region,
//   defaultHeaders:{
//       "anthropic-beta":"max-tokens-3-5-sonnet-2024-07-15"
//   },
//   googleAuth: auth
// });