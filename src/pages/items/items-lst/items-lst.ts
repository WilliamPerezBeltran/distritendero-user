import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ItemService} from "../../../services/item.service";
import {ItemModel} from "../../../models/item.model";
import {ItemsAddPage} from "../items-add/items-add";

@IonicPage()
@Component({
  selector: 'page-items-lst',
  templateUrl: 'items-lst.html',
})
export class ItemsLstPage {

  items: ItemModel[];

  /**
   * Constructor.
   * @param {NavController} navCtrl
   * @param {ItemService} itemService
   */
  constructor(public navCtrl: NavController, private itemService: ItemService) {
    this.getItems();
  }

  /**
   * Get the list of items.
   */
  getItems() {
    this.itemService
      .all()
      .then(items => {
        console.log(items);
        this.items = items;
      });

  }

  /**
   * Navigates to the create view.
   */
  newItem() {

    // Pushing the create view.
    this.navCtrl.push(ItemsAddPage);
  }

}
