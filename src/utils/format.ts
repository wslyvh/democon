export function getBadgeType(type: string): string {
  if (type === 'Realigned') return 'badge-success';
  if (type === 'Front-line') return 'badge-warning';

  return 'badge-primary';
}

export function getRoomColor(type: string): string {
  if (type === 'Khaki Room') return '#c3b091';
  if (type === 'Magenta Room') return '#ff98ff';

  return '#0275d8';
}
