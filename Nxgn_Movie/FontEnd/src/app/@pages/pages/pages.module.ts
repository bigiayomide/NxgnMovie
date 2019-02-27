import { NgModule } from "@angular/core";
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule
} from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PagesRouterModule } from "./pages.routes";

import { CoreModule } from "../../@themes/components/core/core.module";

@NgModule({
  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    CoreModule,
    PagesRouterModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class PagesModule {}