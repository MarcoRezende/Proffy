export default function convertHourToMinutes(time: string) {
    // estamos transformando uma string, por exemplo "8:00", e
    // a separando pelo caractere ":", em seguida transformando
    // as duas strings retornadas ("8" e "00") em numeros.
    // Usando desestruturação, faremos que a primeira
    // variavel "hour" receba o primeiro valor do array retornado, etc.
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}