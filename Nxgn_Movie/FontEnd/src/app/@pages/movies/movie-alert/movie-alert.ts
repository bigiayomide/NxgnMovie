import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { IDialogMessage } from "../../../shared/interfaces/interfaces";

@Component({
  selector: "nxg-movie-alert-dialog",
  templateUrl: "./movie-alert.html",
  styleUrls: ["./movie-alert.scss"]
})
export class MovieAlertDialogComponent implements OnInit {
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
