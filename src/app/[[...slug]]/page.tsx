import '../../index.css';
import { ClientOnly } from './client';

// export function generateStaticParams() {
//   return [{ slug: [''] }];
// }sud

export default function Page() {
  return <ClientOnly />;
}
