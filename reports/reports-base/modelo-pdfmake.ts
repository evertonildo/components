
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import { dateToString, cnpjMask, getBase64ImageFromURL } from './fdus';

export async function ModeloPdfMake(data: any[]) {
  console.log('ModeloPdfMake', data);
  let BRReal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const companyLogo = await getBase64ImageFromURL(`${'http://localhost:4200/assets/img/bd-logo.svg'}`);
  const dataTable: any[] = [];
  data.forEach(element => {
    dataTable.push([
      element.userId,
      element.username + ''.toUpperCase(),
      element.email + ''.toLowerCase(),
      { image: element.avatar, width: 50 },
      // element.avatar,
      dateToString(element.birthdate),
      dateToString(element.registeredAt)
    ]);
  });
  console.log('dataTable', dataTable);
  var docDefinition: TDocumentDefinitions = {
    pageOrientation: "portrait",
    header: [
      {
        margin: [20, 20, 20, 10],
        columns: [
          // {
          //   text: "Angular Application Model",
          //   alignment: "left",
          //   fontSize: 12,
          //   bold: true,
          //   margin: 10,
          // },
          {
            image: companyLogo,
            width: 50,
          },
          {
            text: `\n Modelo de relatório tipo listagem `,
            style: "header",
            alignment: "center",
          },
          {
            text: `${'MJV Innovation'}\n${'Bradesco Saúde'
              }\n${cnpjMask('28244698000100')}\n\n\n`,
            alignment: "right",
            fontSize: 12,
            bold: true,
            margin: 10,
          },
        ],
      },
    ],
    content: [
      {
        style: 'tableExample',
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Nome', 'e-mail', 'Avatar', 'Data Nascimento', 'Data registro'], ...dataTable
          ]
        }
      }
    ],
    footer: function (currentPage, pageCount) {
      return {
        layout: "headerLineOnly",
        margin: [20, 20, 20, 10],
        columns: [
          {
            text: `Relatório gerado usando PdfMake`,
            alignment: "left",
            fontSize: 8,
            lineHeight: 1,
          },
          {
            text: `Página ${currentPage.toString() + " de " + pageCount}`,
            alignment: "right",
            fontSize: 8,
            lineHeight: 1,
          },
        ],
      };
    },
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: "center",
      },
      body: {
        fontSize: 12,
        bold: false,
        alignment: "justify",
      },
      quote: { italics: true },
      small: { fontSize: 8 },
      tableExample: {
        margin: [0, 5, 0, 15],
        fontSize: 9,
      },
    },
  };
  pdfMake.createPdf(docDefinition).open();
}
