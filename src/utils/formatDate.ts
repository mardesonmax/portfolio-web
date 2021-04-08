export default function formatDate(date: Date): string {
  const newDate = new Date(date);

  const monthArray = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Maio',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const formatted = `${
    monthArray[newDate.getMonth()]
  }/${newDate.getFullYear()}`;

  return formatted;
}
