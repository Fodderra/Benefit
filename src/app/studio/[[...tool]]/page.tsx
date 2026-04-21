import { redirect } from 'next/navigation';

// Sanity Studio runs separately via `npx sanity dev`
// Access it at http://localhost:3333 when running locally
// Or at https://your-project.sanity.studio after deployment
export default function StudioPage() {
  redirect('https://sanity.io/manage');
}
