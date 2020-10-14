export function getBadgeType(type: string): string {
  if (type === 'Realigned') return 'badge-success';
  if (type === 'Front-line') return 'badge-warning';

  return 'badge-primary';
}
