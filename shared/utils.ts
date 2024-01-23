
export const isLocalhost = (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'));

export function toBase64Code(arg0: string): string {
  return btoa(arg0);
}


export function semana(dia: number, mes: number, ano: number, dow: number) {

  let primeiro = new Date(ano, mes-1, dia-1);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  console.log('semana dia', dia, days[dow], mes, months[mes], ano);
  var day = days[dow];
  var month = months[primeiro.getMonth()];

  let dataInit = primeiro.setDate(primeiro.getDate() -1 * primeiro.getDay())

  console.log('dia primeiro', primeiro);
  console.log('domingo da semana', new Date(dataInit));

}
