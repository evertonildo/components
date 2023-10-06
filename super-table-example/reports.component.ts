import { faker } from "@faker-js/faker";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ModeloPdfMake } from "../reports/reports-base/modelo-pdfmake";
import { getBase64ImageFromURL } from "../reports/reports-base/fdus";
import { IReports } from "./IReports";
import { User } from "./User";
import { IPaginator, TablePaginationComponent } from "../super-table/table-pagination.component";
import { isLocalhost } from "../shared/utils";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  reports: IReports[] = [];
  data: any[] = [];
  gridColumnsHeaders: any[] = [];
  gridColumnsIds: string[] = [];
  reportData: any[] = [];
  dataReport: any[] = [];
  configPaginator!: IPaginator;
  @ViewChild("tablePaginator") tablePaginator!: TablePaginationComponent;

  constructor() {}

  ngOnInit(): void {
    this.reports.push({
      name: "Ficha do Segurado",
      route: "ficha-segurado",
      gridColumnsIds: ["userId", "username", "birthdate", "email", "avatar"],
      gridColumnsHeaders: [
        {
          columnName: "userId",
          columnHeader: "Id",
          columnType: "text",
          columnMask: "",
          columnStyle: "",
        },
        {
          columnName: "username",
          columnHeader: "Nome",
          columnType: "text",
          columnMask: "",
          columnStyle: "",
        },
        {
          columnName: "birthdate",
          columnHeader: "Data Nascimento",
          columnType: "date",
          columnMask: "dd/MM/yyyy",
        },
        {
          columnName: "email",
          columnHeader: "e-mail",
          columnType: "text",
          columnMask: "",
          columnStyle: "",
        },
        {
          columnName: "avatar",
          columnHeader: "Avatar",
          columnType: "img",
          columnMask: "",
          columnStyle: "",
        },
      ],
      fakeData: faker.helpers.multiple<User>(createRandomUser, {
        count: 500,
      }),
    });
    this.selectedReport(this.reports[0]);
    if (isLocalhost) console.info("this.reports", this.reports);
  }

  paginacao(event: any) {
    event = event as IPaginator;
    if (isLocalhost) {
      console.group("paginacao");
      console.info("configPaginator", event);
    }
    if (event.reload) {
      if (isLocalhost) {
        console.info("reload solicitado");
        console.info(
          "Registro inicial",
          event.pageSize * (event.firstPage - 1)
        );
        console.info("registro final", event.pageSize * event.lastPage);
      }

      this.configPaginator.totalLines = this.data.length;
      this.configPaginator.totalPages = Math.floor(
        this.data.length / this.configPaginator.pageSize
      );
      this.configPaginator.reload = false;
      if (
        this.configPaginator.totalPages <
        this.data.length / this.configPaginator.pageSize
      )
        this.configPaginator.totalPages++;
      this.dataReport = this.data.slice(
        event.firtsRecord - 1,
        event.lastRecord
      );
      if (isLocalhost) console.info("dataReport", this.dataReport);
    }
    if (isLocalhost) console.groupEnd();
    this.tablePaginator.filterData(this.dataReport);
  }

  selectedReport(report: any) {
    this.gridColumnsHeaders = report.gridColumnsHeaders;
    this.gridColumnsIds = report.gridColumnsIds;
    let cont = 0;
    report.fakeData.forEach((element: any) => {
      cont++;
      element.userId = cont;
    });
    this.data = report.fakeData;
    if (isLocalhost) console.info("configPaginator", this.configPaginator);
    this.configPaginator = {
      currentPageIndex: 0,
      currentPage: 0,
      pageSize: 5,
      totalPages: this.data.length / 5,
      pageButtonStyle: "",
      totalLines: this.data.length,
      firstPage: 0,
      lastPage: 5,
      firtsRecord: 1,
      lastRecord: 25,
      reload: false,
    };
    this.dataReport = this.data.slice(
      this.configPaginator.pageSize * this.configPaginator.firstPage,
      this.configPaginator.pageSize * this.configPaginator.lastPage
    );
    if (isLocalhost) console.info("configPaginator", this.configPaginator);
    this.reportData = [];
    this.data.forEach(async (element: any) => {
      let {
        userId,
        username,
        email,
        avatar,
        password,
        birthdate,
        registeredAt,
      } = element;
      avatar = await getBase64ImageFromURL(avatar);
      this.reportData.push({
        userId: userId,
        username: username,
        email: email,
        avatar: avatar,
        password: password,
        birthdate: birthdate,
        registeredAt: registeredAt,
      });
    });
  }

  async GerarReportModel() {
    if (isLocalhost) console.info("this.reportData", this.reportData);
    ModeloPdfMake(this.reportData);
  }
}

export function createRandomUser(): User {
  return {
    userId: faker.finance.pin(),
    username: `${faker.person.fullName()}`, //faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate().toISOString(),
    registeredAt: faker.date.past().toISOString(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
