import { data } from 'react-router';

export function clientLoader() {
  // Cai no ErrorBoundary do root com status 404
  throw data(null, { status: 404 });
}

export default function NotFound() {
  return null;
}
