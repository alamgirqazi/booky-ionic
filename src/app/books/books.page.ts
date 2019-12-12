import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AddnewbookComponent } from './addnewbook/addnewbook.component';
import { BooksService } from '../../sdk/custom/books.service';

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
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;

    this.booksService.getAllBooks().subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.books = data.data.docs;
      },
      error => {
        this.loading = false;
        console.log('error', error);
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

  deleteBook() {
    this.deleteLoading = true;
    this.booksService.deleteBook(this.selectedBook._id).subscribe(
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
