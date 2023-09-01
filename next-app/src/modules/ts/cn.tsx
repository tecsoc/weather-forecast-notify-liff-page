export default function cn(...args: (string | undefined)[]) {
  return args.filter(arg => arg).join(' ');
}