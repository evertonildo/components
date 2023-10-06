import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ComponentBase } from "../shared/ComponentBase";
import { HealthService } from "src/app/shared/health.service";

@Component({
  selector: "app-details-found",
  templateUrl: "./details-found.component.html",
  styleUrls: ["./details-found.component.scss"],
})
export class DetailsFoundComponent extends ComponentBase implements OnInit {
  displayedColumns = [
    "Id",
    "Material",
    "Lote",
    "Vencimento",
    "Fornecedor",
    "CodigoFornecedor",
    "Acao",
  ];
  records: any[] = [];
  constructor(
    public api: HealthService,
    public dialogRef: MatDialogRef<DetailsFoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    this.records = this.data.data;
    this.dataSource = new MatTableDataSource(this.records);
  }

  save(element: any) {
    this.dialogRef.close(element);
  }
}
