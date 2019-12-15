import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AddnewbookComponent } from './addnewbook/addnewbook.component';
import { AuthService } from './../../sdk/core/auth.service';
import { BooksService } from '../../sdk/custom/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss']
})
export class BooksPage implements OnInit {
  loading = false;
  deleteLoading = false;
  books: Books[] = [];
  bookIconPath = 'assets/icon/book.png';
  skeletonlist = [1, 2, 3, 4, 5];
  selectedBook: Books;
  constructor(
    private booksService: BooksService,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.loading = true;

    const observable = await this.booksService.getAllBooks();
    observable.subscribe(
      data => {
        this.books = data.data.docs;
        this.loading = false;
        console.log('data', data);
      },
      err => {
        console.log('err', err);
      }
    );
  }

  openEditPopup(book: Books) {
    this.openAddModal(book);
  }

  async openAddModal(book?: Books) {
    const modal = await this.modalController.create({
      component: AddnewbookComponent,
      componentProps: { book }
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed', data);
      this.getAll();
    });
    await modal.present();
  }

  async delete(book) {
    this.selectedBook = book;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the book "${book.name}"`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteBook();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteBook() {
    this.deleteLoading = true;
    const observable = await this.booksService.deleteBook(
      this.selectedBook._id
    );

    observable.subscribe(
      data => {
        console.log('got response from server', data);
        this.deleteLoading = false;
        this.getAll();
      },
      error => {
        this.deleteLoading = false;
        console.log('error', error);
      }
    );
  }
}

// Intefacing is Optional

interface Books {
  name: string;
  ibn: string;
  _id?: string;
  image_url: string;
  author: string;
  is_deleted: boolean;
}
