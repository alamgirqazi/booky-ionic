import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddnewbookComponent } from './addnewbook/addnewbook.component';
import { BooksPage } from './books.page';
import { BooksPageRoutingModule } from './books-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BooksPageRoutingModule
  ],
  declarations: [BooksPage, AddnewbookComponent],
  entryComponents: [AddnewbookComponent]
})
export class BooksPageModule {}
