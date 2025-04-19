import { Component, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'pager',
  templateUrl: './pager.html',
  styleUrl: './pager.css'
})
export class PagerComponent {
  @Input() model: PagerModel = new PagerModel();

  set currentPageProxy(input: number) {
    this.model.currentPage = input;
    this.model.clickHandler();
  };

  constructor() { }
}


export class PagerModel {

  private _recordCount: number = 0;
  get recordCount() { return this._recordCount; }
  set recordCount(input: number) {
    this._recordCount = input;
    this.updatePageCount();
  };

  private _pageCount: number = 1;
  get pageCount() { return this._pageCount; }
  set pageCount(input: number) {
    alert('pageCount禁止寫入');
  };

  private _currentPage: number = 1;
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(input: number) {
    this._currentPage = input;
    this.updatePagers();
  };

  private _pageSize: number = 10;
  get pageSize() { return this._pageSize; }
  set pageSize(input: number) {
    this._pageSize = input;
    this.updatePageCount();
    this.clickHandler();
  };

  get startIndex() {
    return (this._currentPage - 1) * this._pageSize;
  };

  pagers: any = {
    firstPage: false,
    pre: false,
    first: 1,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    post: false,
    lastPage: false
  };

  constructor() {
    this.updatePageCount();
  };

  private updatePageCount() {
    this._pageCount = Math.ceil(this._recordCount / this.pageSize);
    if (this._pageCount > 0 && this._currentPage > this._pageCount) {
      this._currentPage = this._pageCount;
    }
    this.updatePagers();
  };

  private updatePagers() {
    var first = Math.floor((this._currentPage - 0.1) / 5) * 5 + 1;
    this.pagers.first = first;

    this.pagers.second = (this._pageCount > first) ? first + 1 : 0;
    this.pagers.third = (this._pageCount > first + 1) ? first + 2 : 0;
    this.pagers.fourth = (this._pageCount > first + 2) ? first + 3 : 0;
    this.pagers.fifth = (this._pageCount > first + 3) ? first + 4 : 0;

    this.pagers.firstPage = (first != 1);
    this.pagers.pre = (this._currentPage > 5);
    this.pagers.post = (this.pagers.fifth != 0 && this._pageCount > this.pagers.fifth);
    this.pagers.lastPage = (this.pagers.post && this._pageCount > this._currentPage);
  };

  isCurrentPage(pagerKey: string): boolean {
    var index = this.pagers[pagerKey];
    if (index > 0 && this._currentPage === index) {
      return true;
    }
    return false;
  };

  turnPage(pageIndex: string) {
    var index = this.pagers[pageIndex];
    if (!index) { return; }
    if (!isNaN(parseInt(index))) {
      this._currentPage = this.pagers[pageIndex];
    } else if (pageIndex === 'pre') {
      if (this._currentPage - 5 > 1) {
        this._currentPage = this._currentPage - 5;
      } else {
        this._currentPage = 1;
      }
    } else if (pageIndex === 'post') {

      if (this._currentPage + 5 < this._pageCount) {
        this._currentPage = this._currentPage + 5;
      } else {
        this._currentPage = this._pageCount;
      }
    } else if (pageIndex === 'firstPage') {
      this._currentPage = 1;
    } else if (pageIndex === 'lastPage') {
      this._currentPage = this._pageCount;
    }

    this.updatePagers();
    this.clickHandler();
  };

  clickHandler() {
    return;
  };
};
