import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import {
  IDialogMessage,
  ICategory
} from "../../../shared/interfaces/interfaces";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ToasterConfig } from "angular2-toaster";

@Component({
  selector: "nxg-category-create-dialog",
  templateUrl: "./category-create.html",
  styleUrls: ["./category-create.scss"]
})
export class CategoryCreateDialogComponent implements OnInit {
  categoryForm: FormGroup;
  _dialogMessage: IDialogMessage;
  category: ICategory;
  spinnerOn = false;
  config: ToasterConfig;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogMessage,
    private formBuilder: FormBuilder
  ) {
    this._dialogMessage = data;

    (this.categoryForm = this.formBuilder.group({
      title: ["", [Validators.required]]
    })),
      (this.category = {
        title: ""
      });
  }

  ngOnInit() {
    this._dialogMessage.valid = false;
  }
  onSubmitclick() {
    this._dialogMessage.valid = true;
    this.spinnerOn = true;
    this.category.title = this.categoryForm.get(
      "title"
    ).value;
    this._dialogMessage.data = this.category;
  }
}
