import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import {
  IDialogMessage,
  IMovie,
  IResultVM,
  StatusEnum,
  IEvent,
  ICategory
} from "../../../shared/interfaces/interfaces";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { ToasterConfig } from "angular2-toaster";
import { CategoryDataService } from "../../../shared/services/category.data.service";

@Component({
  selector: "nxg-event-status-update-dialog",
  templateUrl: "./movie-update.html",
  styleUrls: ["./movie-update.scss"]
})
export class MovieUpdateDialogComponent implements OnInit {
  movieForm: FormGroup;
  _dialogMessage: IDialogMessage;
  category_id = new FormControl("", [Validators.required]);
  movie: IMovie;
  categories: ICategory[];
  spinnerOn = false;
  config: ToasterConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogMessage,
    private formBuilder: FormBuilder,
    private categoryDataService: CategoryDataService
  ) {
    this._dialogMessage = data;

    (this.movieForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required,Validators.maxLength(200)]],
      rating: ["", [Validators.required]],
    })),
      (this.movie = {
        id: 0,
        description: "",
        title: "",
        category_id: 0,
        rating:0
      });
  }

  ngOnInit() {
    const viewdata = this._dialogMessage.data as IMovie;

    this.categoryDataService.GetAllCategories().subscribe(result => {
      const loginResult = result as IResultVM;
      if (loginResult.status === StatusEnum.Success) {
        this.categories = loginResult.data as ICategory[];
        const exisitingvalue = this.categories.find(x => x.id == viewdata.category_id);
        this.category_id.setValue(exisitingvalue);
      } else if (loginResult.status === StatusEnum.Error) {
      }
    });

    if (viewdata !== undefined) {
      this.movie = this._dialogMessage.data;
      this.movieForm.controls["title"].patchValue(
        viewdata.title
      );
      this.movieForm.controls["description"].patchValue(
        viewdata.description
      );
      this.movieForm.controls["rating"].patchValue(
        viewdata.rating
      );
    }
    this._dialogMessage.valid = false;
  }

  onSubmitclick() {
    this._dialogMessage.valid = true;
    this.spinnerOn = true;
    this.movie.category_id = this.category_id.value.id;
    this.movie.title = this.movieForm.get(
      "title"
    ).value;
    this.movie.description = this.movieForm.get(
      "description"
    ).value;
    this.movie.rating = this.movieForm.get(
      "rating"
    ).value;
    this._dialogMessage.data = this.movie;
  }
}
