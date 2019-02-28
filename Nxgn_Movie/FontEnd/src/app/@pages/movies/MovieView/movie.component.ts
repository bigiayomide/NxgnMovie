import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IResultVM,
  StatusEnum,
  IDialogMessage,
  IMovie
} from "../../../shared/interfaces/interfaces";
import { Http } from "@angular/http";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType
} from "angular2-toaster";
import { MovieDataService } from "../../../shared/services/movie.data.service";
import { ConfigService } from "../../../shared/utils/config.service";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  PageEvent
} from "@angular/material";
import { MovieAlertDialogComponent } from "../movie-alert/movie-alert";
import { MovieCreateDialogComponent } from "../movie-create/movie-create";
import { MovieUpdateDialogComponent } from "../movie-update/movie-update";

@Component({
  selector: "nxg-movie-list",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"]
})
export class MovieComponent implements OnInit {
  public showLoader: boolean = false;
  public movies: IMovie[];
  public movie: IMovie;

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
  displayedColumns: string[] = [
    "category_id",
    "title",
    "description",
    "rating",
    "actions"
  ];
  moviesDataSource: MatTableDataSource<IMovie>;

  resultsLength = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50];
  PageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _dialogMessage: IDialogMessage = {
    message: "Are you sure you want to delete this",
    valid: false,
    data: null
  };

  constructor(
    public http: Http,
    private toasterService: ToasterService,
    public dataService: MovieDataService,
    private configService: ConfigService,
    public router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetMovieDetails();
  }

  reload() {
    this.GetMovieDetails();
  }
  GetMovieDetails() {
    this.dataService.GetAllMovies().subscribe(
      (result: any) => {
        this.showLoader = true;
        const loginResult = result as IResultVM;
        if (loginResult.status === StatusEnum.Success) {
          this.moviesDataSource = new MatTableDataSource<IMovie>(
            loginResult.data as IMovie[]
          );
          this.moviesDataSource.paginator = this.paginator;
        } else if (loginResult.status === StatusEnum.Error) {
          this.showToast(
            "error",
            "Movie Error",
            "Error occurred while Loading Movies"
          );
        }
        setTimeout(() => {
          this.showLoader = false;
        }, 2000);
      },
      error => {
        this.showToast(
          "error",
          "Movie Error",
          "Error occurred while Loading Movies"
        );
      }
    );
  }

  onDeleteMoviedetails(moviedata: IMovie) {
    this._dialogMessage.data = moviedata;
    const dialogRef = this.dialog.open(MovieAlertDialogComponent, {
      width: "250px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.DeleteMovie(dialogresult.data.id).subscribe(
          (result: any) => {
            this.showLoader = true;
            const movieResult = result as IResultVM;
            const movie = movieResult.data as IMovie;
            if (movieResult.status === StatusEnum.Success) {
              this.GetMovieDetails();
              this.showToast(
                "success",
                "Movie Success",
                "Deleted " + movie.title + " Successfuly"
              );
            } else if (movieResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Movie Error",
                "Error occurred while Loading Movies"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {
            this.showToast(
              "error",
              "Movie Error",
              "Error occurred while Loading Movies"
            );
          }
        );
      }
    });
  }
  OnCreateMoviedetails() {
    const dialogRef = this.dialog.open(MovieCreateDialogComponent, {
      width: "500px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.CreateMovie(dialogresult.data).subscribe(
          (result: any) => {
            this.showLoader = true;
            const movieResult = result as IResultVM;
            const movie = movieResult.data as IMovie;
            if (movieResult.status === StatusEnum.Success) {
              this.GetMovieDetails();
              this.showToast(
                "success",
                "Movie Success",
                "Created Tournamnet " +
                  movie.title +
                  " Successfuly"
              );
            } else if (movieResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Movie Error",
                "Error occurred while Loading Movies"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {
            this.showToast(
              "error",
              "Movie Error",
              "Error occurred while Loading Movies"
            );
          }
        );
      }
    });
  }
  onViewMoviedetails(moviedata: IMovie) {
    this._dialogMessage.data = moviedata;
    const dialogRef = this.dialog.open(MovieUpdateDialogComponent, {
      width: "500px",
      data: this._dialogMessage
    });

    dialogRef.afterClosed().subscribe((dialogresult: IDialogMessage) => {
      if (dialogresult.valid === true) {
        this.dataService.UpdateMovie(dialogresult.data).subscribe(
          (result: any) => {
            this.showLoader = true;
            const movieResult = result as IResultVM;
            const movie = movieResult.data as IMovie;
            if (movieResult.status === StatusEnum.Success) {
              this.GetMovieDetails();
              this.showToast(
                "success",
                "Movie Success",
                "Created Tournamnet " +
                  movie.title +
                  " Successfuly"
              );
            } else if (movieResult.status === StatusEnum.Error) {
              this.showToast(
                "error",
                "Movie Error",
                "Error occurred while Loading Movies"
              );
            }
            setTimeout(() => {
              this.showLoader = false;
            }, 2000);
          },
          error => {

            this.showToast(
              "error",
              "Movie Error",
              "Error occurred while Loading Movies"
            );
          }
        );
      }
    });
  }

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
