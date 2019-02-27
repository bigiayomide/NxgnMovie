import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./CategoryView/category.component";

const childRoutes: Routes = [
  {
    path: "category-view",
    component: CategoryComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
