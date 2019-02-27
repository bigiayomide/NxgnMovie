import { MatRadioModule } from "@angular/material/radio";
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
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatButtonToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatGridListModule,
  MatSelectModule,
  MatSortModule
} from "@angular/material";
import { MovieComponent } from "./MovieView/movie.component";
import { MovieUpdateDialogComponent } from "./movie-update/movie-update";
import { MovieCreateDialogComponent } from "./movie-create/movie-create";
import { MovieDataService } from "../../shared/services/movie.data.service";
import { MovieAlertDialogComponent } from "./movie-alert/movie-alert";
import { Routes, RouterModule } from "@angular/router";
import {StarRatingModule, StarRatingConfigService} from "angular-star-rating"
import { CategoryDataService } from "../../shared/services/category.data.service";

export const appRoutes: Routes = [
  { path: "", component: MovieComponent }
];

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
    MatPaginatorModule,
    RoundProgressModule,
    MatMenuModule,
    MatGridListModule,
    MatChipsModule,
    MatTableModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    StarRatingModule,
    MatInputModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ToasterModule
  ],
  declarations: [
    MovieComponent,
    MovieAlertDialogComponent,
    MovieUpdateDialogComponent,
    MovieCreateDialogComponent
  ],
  exports: [
    MovieComponent,
    MovieAlertDialogComponent,
    MovieUpdateDialogComponent,
    MovieCreateDialogComponent
  ],
  providers: [
    ToasterService,
    MovieDataService,
    CategoryDataService,
    StarRatingConfigService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  entryComponents: [
    MovieAlertDialogComponent,
    MovieUpdateDialogComponent,
    MovieCreateDialogComponent
  ]
})
export class MovieModule {}
