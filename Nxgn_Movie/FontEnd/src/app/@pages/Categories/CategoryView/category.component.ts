import { Component, OnInit, Injectable } from "@angular/core";
import {
  ICategory,
  IResultVM,
  StatusEnum,
  IDialogMessage
} from "../../../shared/interfaces/interfaces";
import { Http } from "@angular/http";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType
} from "angular2-toaster";
import { CategoryDataService } from "../../../shared/services/category.data.service";
import { ConfigService } from "../../../shared/utils/config.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CategoryAlertDialogComponent } from "../category-alert/category-alert";
import { CategoryCreateDialogComponent } from "../category-create/category-create";
import { CategoryUpdateDialogComponent } from "../category-update/category-update";

@Component({
  selector: "nxg-category-list",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  _dialogMessage: IDialogMessage = {
    message: "Are you sure you want to delete this",
    valid: false,
    data: null
  };

  constructor(
    public http: Http,
    private toasterService: ToasterService,
    public dataService: CategoryDataService,
    private configService: ConfigService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  public showLoader: boolean = false;
  public categories: ICategory[];
  public category: ICategory;
  ngOnInit() {
    this.GetTournamnets();
  }

  reload() {
    this.GetTournamnets();
  }
  GetTournamnets() {
    this.dataService.GetAllCategories().subscribe(
      (result: any) => {
        this.showLoader = true;
        const loginResult = result as IResultVM;
        this.categories = loginResult.data as ICategory[];
        if (loginResult.status === StatusEnum.Success) {
        } else if (loginResult.status === StatusEnum.Error) {
          this.showToast(
            "error",
            "Category Error",
            "Error occurred while Loading Tournanments"
          );
        }
        setTimeout(() => {
          this.showLoader = false;
        }, 2000);
      },
      error => {
        ;
        this.showToast(
          "error",
          "Category Error",
          "Error occurred while Loading Tournanments"
        );
      }
    );
  }

  onDeleteCategory(categorydata: ICategory) {
    this._dialogMessage.data = categorydata;
    const dialogRef = this.dialog.open(CategoryAlertDialogComponent, {
      width: "250px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.DeleteCategory(dialogresult.data.id).subscribe(
          (result: any) => {
            this.showLoader = true;
            const categoryResult = result as IResultVM;
            var tournamen = categoryResult.data as ICategory;
            if (categoryResult.status === StatusEnum.Success) {
              this.GetTournamnets();
              this.showToast(
                "success",
                "Category Success",
                "Deleted " + tournamen.title + " Successfuly"
              );
            } else if (categoryResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Category Error",
                "Error occurred while Loading Tournanments"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {
            ;
            this.showToast(
              "error",
              "Category Error",
              "Error occurred while Loading Tournanments"
            );
          }
        );
      }
    });
  }
  OnCreateCategory() {
    const dialogRef = this.dialog.open(CategoryCreateDialogComponent, {
      width: "500px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.CreateCategory(dialogresult.data).subscribe(
          (result: any) => {
            this.showLoader = true;
            const categoryResult = result as IResultVM;
            var category = categoryResult.data as ICategory;
            if (categoryResult.status === StatusEnum.Success) {
              this.GetTournamnets();
              this.showToast(
                "success",
                "Category Success",
                "Created Tournamnet " +
                  category.title +
                  " Successfuly"
              );
            } else if (categoryResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Category Error",
                "Error occurred while Loading Tournanments"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {
            ;
            this.showToast(
              "error",
              "Category Error",
              "Error occurred while Loading Tournanments"
            );
          }
        );
      }
    });
  }
  onViewCategory(categorydata: ICategory) {
    this._dialogMessage.data = categorydata;
    const dialogRef = this.dialog.open(CategoryUpdateDialogComponent, {
      width: "500px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.UpdateCategory(dialogresult.data).subscribe(
          (result: any) => {
            this.showLoader = true;
            const categoryResult = result as IResultVM;
            var category = categoryResult.data as ICategory;
            if (categoryResult.status === StatusEnum.Success) {
              this.GetTournamnets();
              this.showToast(
                "success",
                "Category Success",
                "Created Tournamnet " +
                  category.title +
                  " Successfuly"
              );
            } else if (categoryResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Category Error",
                "Error occurred while Loading Tournanments"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {
            ;
            this.showToast(
              "error",
              "Category Error",
              "Error occurred while Loading Tournanments"
            );
          }
        );
      }
    });
  }
  config: ToasterConfig;
  position: string = "toast-top-full-width";
  animationType: string = "slideDown";
  title: string = "HI there!";
  content: string = `I'm cool toaster!`;
  timeout: number = 5000;
  toastsLimit: number = 5;
  type: string = "default";
  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  makeToast() {
    this.showToast(this.type, this.title, this.content);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.popAsync(toast);
  }
}
