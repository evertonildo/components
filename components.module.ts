import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltroComponent } from "./filtro/filtro.component";
import { TablePaginationComponent } from "./super-table/table-pagination.component";
import { MaterialModule } from "./shared/material.module";
import { DetailsFoundComponent } from "./details-found/details-found.component";

@NgModule({
  declarations: [
    FiltroComponent,
    TablePaginationComponent,
    DetailsFoundComponent],
  imports: [CommonModule, MaterialModule],
  exports:[FiltroComponent, TablePaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
