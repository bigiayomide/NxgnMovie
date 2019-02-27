import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { IDialogMessage } from "../../../shared/interfaces/interfaces";

@Component({
  selector: "nxg-category-alert-dialog",
  templateUrl: "./category-alert.html",
  styleUrls: ["./category-alert.scss"]
})
export class CategoryAlertDialogComponent implements OnInit {
  _dialogMessage: IDialogMessage;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogMessage) {
    this._dialogMessage = data;
  }

  ngOnInit() {
    this._dialogMessage.valid = false;
  }
  onOkclick() {
    this._dialogMessage.valid = true;
  }
}
