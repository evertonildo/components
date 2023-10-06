import { Component, OnInit } from "@angular/core";
import { ComponentBase } from "../shared/ComponentBase";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-item-alto-custo",
  templateUrl: "./add-item-alto-custo.component.html",
  standalone: true,
  styleUrls: ["./add-item-alto-custo.component.scss"],
})
export class AddItemAltoCustoComponent extends ComponentBase implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddItemAltoCustoComponent>) {
    super();
  }

  ngOnInit() {}
}
