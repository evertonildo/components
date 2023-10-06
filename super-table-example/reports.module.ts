import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { ReportsComponent } from "./reports.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material.module";
import { ComponentsModule } from "../components.module";

@NgModule({
  imports: [CommonModule, MaterialModule, ComponentsModule],
  exports: [],
  declarations: [ReportsComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportsModule {}
