import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { Ng2OdometerModule } from "ng2-odometer";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import { ToasterService, ToasterModule } from "angular2-toaster";
import { CategoryComponent } from "./CategoryView/category.component";
import { CategoryDataService } from "../../shared/services/category.data.service";
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatButtonToggleModule
} from "@angular/material";
import { CategoryAlertDialogComponent } from "./category-alert/category-alert";
import { CategoryCreateDialogComponent } from "./category-create/category-create";
import { CategoryUpdateDialogComponent } from "./category-update/category-update";
import { Routes, RouterModule } from "@angular/router";

export const appRoutes: Routes = [{ path: "", component: CategoryComponent }];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    Ng2OdometerModule,
    RoundProgressModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ToasterModule
  ],
  declarations: [
    CategoryComponent,
    CategoryAlertDialogComponent,
    CategoryCreateDialogComponent,
    CategoryUpdateDialogComponent
  ],
  exports: [
    CategoryComponent,
    CategoryAlertDialogComponent,
    CategoryCreateDialogComponent,
    CategoryUpdateDialogComponent
  ],
  providers: [
    ToasterService,
    CategoryDataService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  entryComponents: [
    CategoryAlertDialogComponent,
    CategoryCreateDialogComponent,
    CategoryUpdateDialogComponent
  ]
})
export class CategoryModule {}
