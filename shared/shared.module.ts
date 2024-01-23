import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReportsComponent } from "./super-table-example/reports.component";
import { TablePaginationComponent } from "./super-table/table-pagination.component";
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ],
  declarations: [ReportsComponent, TablePaginationComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
