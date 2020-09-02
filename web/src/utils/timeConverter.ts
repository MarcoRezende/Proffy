export default function timeConvert(num: number) {
  let hours = Math.floor(num / 60);
  let minutes = num % 60;

  function prependZero(number: number) {
    if (number < 9) {
      return "0" + number;
    } else {
      return number;
    }
  }

  return !minutes ? `${prependZero(hours)}h` : `${prependZero(hours)}h:${prependZero(minutes)}m`;
}