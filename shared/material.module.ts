import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

const Modules = [
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, Modules],
  exports: [Modules],
})
export class MaterialModule {}
