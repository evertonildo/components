import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import Swal from "sweetalert2";
import { isLocalhost } from "../utils";
import { Router } from "@angular/router";

@Component({
  selector: "app-super-table",
  templateUrl: "./table-pagination.component.html",
  styleUrls: ["./table-pagination.component.css"],
})
export class TablePaginationComponent implements OnInit {
  @Input() gridColumnsHeaders: IColumnHeader[] = [];
  @Input() gridColumnsIds: string[] = [];
  @Output() paginator = new EventEmitter<IPaginator>();
  @Output() sendReport = new EventEmitter();
  @Output() clickOption = new EventEmitter();
  @Input() tableData: any[] = [];
  @Input() tableTitle: string = "Título não informado";
  @Input() configPaginator!: IPaginator;
  @Input() menuOptions: IMenuContexto[] = [];

  private _currentPage: number = 1;
  private _pagesList: number[] = [];
  selectedPage!: number;
  public get pagesList(): number[] {
    return this._pagesList;
  }
  public set pagesList(value: number[]) {
    this._pagesList = value;
  }

  public get currentPage(): number {
    return this._currentPage;
  }
  public set currentPage(value: number) {
    this._currentPage = value;
    if (isLocalhost) console.info("currentPage", this._currentPage);
  }

  pagesNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  filtredData: any[] = [];

  public getPagesNumbers() {
    let total = this.configPaginator.totalPages;
    let _pagesNumbers = [];
    for (let i = 0; i < total; i++) _pagesNumbers.push(i + 1);
    this.configPaginator.totalPages = total;
    this.configPaginator.firstPage = _pagesNumbers[0];
    this.configPaginator.lastPage =
      _pagesNumbers[_pagesNumbers.length >= 5 ? 4 : _pagesNumbers.length - 1];
    if (isLocalhost) console.log("pagesNumbers", _pagesNumbers);
    return _pagesNumbers;
  }

  constructor(private ref: ChangeDetectorRef, private router: Router) {}

  public setup(
    columnsHeaders: IColumnHeader[],
    columnsIds: string[],
    configPaginator: IPaginator,
    menuOptions: IMenuContexto[]
  ) {
    this.gridColumnsHeaders = columnsHeaders;
    this.gridColumnsIds = columnsIds;
    this.configPaginator = configPaginator;
    this.menuOptions = menuOptions;
  }

  ngOnInit() {
    //console.group("inicialização");
    //console.log("gridColumnsHeaders", this.gridColumnsHeaders);
    //console.log("gridColumnsIds", this.gridColumnsIds);
    //console.log("tableData", this.tableData);
    //console.log("configPaginator", this.configPaginator);
    //console.groupEnd();

    this.pagesNumbers = this.getPagesNumbers();
    this.selectedPage = 1;
    this.resetPagesList();
    this.filterData();
    let texto = "";
    if (this.menuOptions.length == 0) {
      texto = "Nenhum opção de contexto menu foi informada";
      Swal.fire({
        icon: "error",
        title: "Atenção !!!",
        text: texto,
        showCloseButton: true,
        showCancelButton: false,
      });
    }
    if (this.gridColumnsHeaders.length == 0) {
      texto =
        "A propriedade [gridColumnsHeaders] não foi informada ao component <TablePaginationComponent>";
      Swal.fire({
        icon: "error",
        title: "Atenção !!!",
        text: texto,
        showCloseButton: true,
        showCancelButton: false,
      });
    }
    if (this.gridColumnsHeaders.length !== this.gridColumnsIds.length) {
      texto =
        "A propriedade [gridColumnsHeaders] deve ter o mesmo número de elementos que a propriedade [gridColumnsIds]";
      Swal.fire({
        icon: "error",
        title: "Atenção !!!",
        text: texto,
        showCloseButton: true,
        showCancelButton: false,
      });
    }
  }
  resetPagesList() {
    this.pagesList = this.pagesNumbers.slice(
      this.currentPage - 1,
      this.currentPage + 4
    );
    if (isLocalhost) console.log("pagesList", this.pagesList);
  }
  report() {
    this.sendReport.emit();
  }
  clickChangePageSize(num: number) {
    if (isLocalhost) console.info("clickChangePageSize");
    this.configPaginator.pageSize = this.configPaginator.pageSize + num;
    this.configPaginator.reload = true;
    this.configPaginator.currentPageIndex = 0;
    this.currentPage = 1;
    this.paginator.emit(this.configPaginator);
    //this.pagesNumbers = this.getPagesNumbers();
    //this.resetPagesList();
    //this.currentPage = 1;
    if (this.pagesNumbers.length < 5)
      for (let i = 4; i > this.pagesNumbers.length; i--) {
        let button = document.getElementById(`button${i}`);
        if (button) button.remove();
      }
    this.filterData();
  }
  changePageSize() {
    if (isLocalhost) console.info("changePageSize");
    let element = document.getElementById("rangePageSize") as HTMLInputElement;
    this.configPaginator.pageSize = parseInt(element.value);
    this.pagesNumbers = this.getPagesNumbers();
    if (isLocalhost)
      console.info(
        "changePageSize",
        this.configPaginator,
        element.value,
        this.pagesNumbers
      );
  }

  redirectTo(opcao: any, element: any, menu: any, id: string = "") {
    console.log("redirectTo", opcao, element);
    if (opcao["redirect"]) {
      localStorage.setItem("currentElement", JSON.stringify(element));
      localStorage.setItem("currentMenuOptions", JSON.stringify(menu));
      if (id !== "") this.router.navigate([opcao.redirect, element[id]]);
      else this.router.navigate([opcao.redirect]);
    } else this.clickOption.emit({ opcao, element });
  }

  public filterData(data: any = null) {
    if (isLocalhost) console.group("filterdata", data);
    if (data) {
      if (isLocalhost) console.info("tableData before", this.tableData);
      this.tableData = data;
      if (isLocalhost) console.info("tableData after", this.tableData);
      this.pagesNumbers = this.getPagesNumbers();
      this.resetPagesList();
    }
    let { pageSize } = this.configPaginator;
    let inicio = 1;
    if (this.configPaginator.currentPageIndex > 4)
      this.configPaginator.currentPageIndex = 0;
    //if (this.configPaginator.currentPageIndex < 5) {
    inicio =
      this.pagesList[this.configPaginator.currentPageIndex] * pageSize -
      pageSize;
    inicio = (this.configPaginator.currentPageIndex + 1) * pageSize - pageSize;

    let fim = inicio + pageSize;

    this.filtredData = this.tableData.slice(inicio, fim);
    if (isLocalhost) {
      console.info("currentPage", this.currentPage);
      console.info("currentPageIndex", this.configPaginator.currentPageIndex);
      console.info("inicio", "fim", "pageSize");
      console.info(inicio, fim, pageSize);
      console.info("tableData", this.tableData);
      console.info("filtredData", this.filtredData);
      console.groupEnd();
    }
    this.ref.markForCheck();
  }

  jumpNext() {
    console.clear();
    if (isLocalhost) console.group("jumpNext");
    this.configPaginator.currentPageIndex++;
    this.currentPage++;
    if (
      this.currentPage > this.pagesNumbers[this.configPaginator.totalPages - 1]
    )
      this.currentPage = this.pagesNumbers[this.configPaginator.totalPages - 1];

    console.log("mod", this.currentPage % 5);
    if (this.currentPage > 1 && this.currentPage % 5 == 1) {
      if (isLocalhost) console.info("enviou a paginação", this.configPaginator);
      this.configPaginator.reload = true;
      this.configPaginator.firstPage = this.currentPage;
      this.configPaginator.lastPage =
        this.currentPage + this.configPaginator.pageSize;
      this.configPaginator.firtsRecord =
        this.currentPage * this.configPaginator.pageSize -
        this.configPaginator.pageSize; // this.configPaginator.currentPageIndex * this.configPaginator.pageSize;
      this.configPaginator.lastRecord =
        this.configPaginator.firtsRecord + this.configPaginator.pageSize * 5;
      this.paginator.emit(this.configPaginator);
      this.resetPagesList();
    } else {
      if (isLocalhost) console.groupEnd();
      this.filterData();
    }
    if (isLocalhost) console.log("configPaginator", this.configPaginator);
    if (this.configPaginator.currentPageIndex == 0) this.resetPagesList();
    //  this.resetPagesList();
  }
  jumpPrior() {
    if (isLocalhost) console.group("jumpPrior");
    this.currentPage--;
    this.configPaginator.currentPageIndex--;
    if (this.currentPage < 1) {
      this.currentPage = 1;
      this.configPaginator.currentPageIndex = 0;
    }
    if (this.pagesNumbers.indexOf(this.currentPage) > 5) {
      this.configPaginator.firstPage++;
      this.configPaginator.lastPage++;
    }

    if (isLocalhost) console.info("configPaginator", this.configPaginator);
    if (isLocalhost) console.info("currentPage", this.currentPage);
    if (isLocalhost) console.groupEnd();
    this.filterData();
  }
  jumpToFirst() {
    if (isLocalhost) console.group("jumpToFirst");
    this.configPaginator.currentPageIndex = 0;
    this.currentPage = 1;
    this.configPaginator.firstPage = 1;
    this.configPaginator.lastPage = 5;
    this.configPaginator.firtsRecord = 1;
    this.configPaginator.lastRecord = this.configPaginator.pageSize * 5;
    this.configPaginator.reload = true;

    if (isLocalhost) {
      console.info("configPaginator", this.configPaginator);
      console.info("currentPage", this.currentPage);
      console.groupEnd();
    }
    this.paginator.emit(this.configPaginator);
    this.pagesList = this.pagesNumbers.slice(0, this.currentPage + 4);
    //this.filterData();
  }
  jumpToLast() {
    if (isLocalhost) console.group("jumpToLast");
    this.configPaginator.currentPageIndex = 4;
    this.currentPage = this.configPaginator.totalPages;
    this.configPaginator.firstPage = this.currentPage - 5;
    this.configPaginator.lastPage = this.currentPage;
    this.configPaginator.firtsRecord =
      this.configPaginator.totalLines - 5 * this.configPaginator.pageSize;
    this.configPaginator.lastRecord = this.configPaginator.totalLines;
    this.configPaginator.reload = true;
    this.paginator.emit(this.configPaginator);
    this.pagesList = this.pagesNumbers.slice(this.currentPage - 5);
    if (isLocalhost) {
      console.info("configPaginator", this.configPaginator);
      console.info("currentPage", this.currentPage);
      console.log("pagesList", this.pagesList);
      console.groupEnd();
    }
  }

  clickPage(page: number, index: number) {
    if (isLocalhost) console.group("clickPage");
    if (isLocalhost) console.info("page", "index", "pagesNumbers", "indexof");
    if (isLocalhost)
      console.info(
        page,
        index,
        this.pagesNumbers,
        this.pagesNumbers.indexOf(page)
      );
    this.configPaginator.currentPageIndex = index; //this.pagesNumbers.indexOf(page);
    this.currentPage = page;
    if (isLocalhost) console.groupEnd();
    this.filterData();
  }
}

export interface IPaginator {
  currentPageIndex: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  pageButtonStyle: string;
  totalLines: number;
  firstPage: number;
  lastPage: number;
  firtsRecord: number;
  lastRecord: number;
  reload: boolean;
  filtro?: any;
}

export interface IMenuContexto {
  id: string;
  paramName: string;
  redirect?: string;
  icon:
    | "fingerprint"
    | "outgoing_mail"
    | "mail"
    | "calendar_month"
    | "format_list_bulleted"
    | "link"
    | "attach_money"
    | "attachment"
    | "person_search"
    | "call_split"
    | "delete"
    | "clear"
    | "password"
    | "filter_alt"
    | "navigate_nest"
    | "list_alt"
    | "info"
    | "edit_note"
    | "attach_file"
    | "checklist"
    | "medication"
    | "insert_drive_file"
    | "insert_link"
    | "description"
    | "cached"
    | "add_circle_outline"
    | "tune";
  text: string;
  click?: string;
  class?:string;
}

export interface IColumnHeader {
  columnName: string;
  columnAnother: string;
  columnHeader: string;
  columnType: "img" | "text" | "date" | "cpf" | "cnpj";
  columnMask: string;
  columnStyle: string;
}

export interface IColumnId {
  name: string;
  description: string;
  type: string;
  mask: string;
}
