import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CdkTableModule } from "@angular/cdk/table";

// import { A11yModule } from "@angular/cdk/a11y";
// import { PortalModule } from "@angular/cdk/portal";
// import { ScrollingModule } from "@angular/cdk/scrolling";
// import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
// import { MatSortModule } from "@angular/material/sort";

// import { MatAutocompleteModule } from "@angular/material/autocomplete";
// import { MatBadgeModule } from "@angular/material/badge";
// import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
// import { MatCardModule } from "@angular/material/card";
// import { MatCheckboxModule } from "@angular/material/checkbox";
// import { MatChipsModule } from "@angular/material/chips";
// import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
// import { MatDividerModule } from "@angular/material/divider";
// import { MatExpansionModule } from "@angular/material/expansion";
// import { MatListModule } from "@angular/material/list";
// import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
// import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatSliderModule } from "@angular/material/slider";
// import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
// import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatTooltipModule } from "@angular/material/tooltip";
// import { MatGridListModule } from "@angular/material/grid-list";

const Modules = [
  CdkTableModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatMenuModule,
  MatIconModule,
  ReactiveFormsModule,

  // A11yModule,
  // MatAutocompleteModule,
  // MatBadgeModule,
  // MatBottomSheetModule,
  MatButtonToggleModule,
  // MatGridListModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatStepperModule,
  // MatDatepickerModule,
  MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatListModule,
  // MatListModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  // MatRippleModule,
  MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  MatSnackBarModule,
  // MatSortModule,
  MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
  // PortalModule,
  // ScrollingModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, Modules],
  exports: [Modules],
})
export class MaterialModule {}
