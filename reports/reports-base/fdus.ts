export function cnpjMask(cnpj: string) {
  try {
      let b1 = cnpj.substring(0, 2);
      let b2 = cnpj.substring(2, 3);
      let b3 = cnpj.substring(5, 3);
      let b4 = cnpj.substring(8, 4);
      let b5 = cnpj.substring(12, 2);
      /// return `${b1}.${b2}.${b3}/${b4}-${b5}`;
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
  } catch (error) {
      console.error('cnpjMask', error, cnpj);
  }
}

export function dateToString(Data: Date, padrao: string = '-'): string {
  if (!Data)
      return padrao;
  try {

      let _date = Data.toString().split('-');
      let ano = _date[0];
      let mes = _date[1];
      let dia = _date[2];
      //console.log('DateToString', Data, ano, mes, dia);
      if (dia && dia.indexOf('T') != -1)
          dia = dia.split('T')[0];
      return `${dia}/${mes}/${ano}`;
  } catch (error) {
      console.error('DateToString', error, Data);
      return '-';
  }

}

export function getBase64ImageFromURL(url): any {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}

