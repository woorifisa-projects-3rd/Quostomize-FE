export default function getYYYYMMDDDate() {
  const today = new Date();

  const year = today.getFullYear(); // 2023
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 06
  const day = today.getDate().toString().padStart(2, '0'); // 18

  const dateString = year + '-' + month + '-' + day; // 2023-06-18

  return dateString;
}