# Raffle Draw Application

A simple, customizable raffle number generator built with React, TypeScript, and Tailwind CSS.

## Features

- Random number generation for raffle draws
- Customizable maximum number via URL parameters
- Customizable title via URL parameters
- History of past draws with timestamps
- Animated drawing with sound effects
- Responsive design for all devices

## Local Development

### Prerequisites

- Node.js (v16 or newer)
- npm, yarn, or pnpm

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd raffle-draw
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one.

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. From the project directory, run:
   ```bash
   vercel login
   vercel
   ```

4. Follow the prompts to deploy your application.

5. For subsequent deployments, you can run:
   ```bash
   vercel --prod
   ```

### Deploying to Netlify

1. Create a Netlify account at [netlify.com](https://netlify.com) if you don't have one.

2. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

3. Login to Netlify and click "New site from Git".

4. Select your Git provider and repository.

5. Configure build settings:
   - Build command: `npm run build` or `yarn build` or `pnpm build`
   - Publish directory: `dist`

6. Click "Deploy site".

### Alternative: Manual Deployment to Netlify

1. Build your project locally:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy the `dist` folder:
   ```bash
   netlify deploy
   ```

4. For production deployment:
   ```bash
   netlify deploy --prod
   ```

## Usage

### Basic Usage

Open the application in your browser. Click "Start Draw" to begin the random number selection.

### URL Parameters

The application supports the following URL parameters:

1. **displayTitle**: Sets a custom title for the raffle draw
   ```
   https://your-deployed-app.com/?displayTitle=Holiday%20Prize%20Draw
   ```

2. **maxNumber**: Sets the maximum number for the raffle (default is 5000)
   ```
   https://your-deployed-app.com/?maxNumber=1000
   ```

3. You can combine both parameters:
   ```
   https://your-deployed-app.com/?displayTitle=School%20Raffle&maxNumber=500
   ```

## License

MIT

## Credits

- Audio effects from [Mixkit](https://mixkit.co/)
- Icons by [Lucide](https://lucide.dev/) 