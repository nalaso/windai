# Wind AI

This is an open source alternative of v0.dev. It integrates various AI providers for code generation and offers a comprehensive set of features for creating and managing UI components.

Try here - [Wind AI](http://windai.vercel.app)
Join discord - [Discord](https://dub.sh/windai-discord)

## Features

- UI generation using various AI providers
- shadcn UI generation
- Tailwind CSS generation
- Responsive analyzer
- Code copy functionality
- Fork users' generations
- Unlimited modification of UI
- Theme management

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (see Environment Variables section below)
4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project uses various environment variables for configuration. Create a `.env.local` file in the root directory and add the following variables:

```
# Database
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# Authentication
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_auth_github_id
AUTH_GITHUB_SECRET=your_auth_github_secret

# Optional: Redis for view count
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Refer to the `.env.example` file for a complete list of available environment variables and their descriptions.

## Model providers

This project uses vercel [ai sdk](https://sdk.vercel.ai/providers/ai-sdk-providers) . Apart from the official ai-sdk provider packages, it also include community package [anthropic-vertex-ai](https://github.com/nalaso/anthropic-vertex-ai) by nalaso for using anthopic models thorugh vertex ai.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/) - learn about React for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework used in this project.
- [Prisma](https://www.prisma.io/) - modern database toolkit used for database operations.
- [NextAuth.js](https://next-auth.js.org/) - authentication library for Next.js applications.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
