import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltroComponent } from "./filtro/filtro.component";
import { TablePaginationComponent } from "./super-table/table-pagination.component";
import { MaterialModule } from "./shared/material.module";

@NgModule({
  declarations: [FiltroComponent, TablePaginationComponent],
  imports: [CommonModule, MaterialModule],
})
export class ComponentsModule {}
