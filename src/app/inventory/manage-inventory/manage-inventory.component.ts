import { Component, OnInit } from '@angular/core';
import { ManageInventory } from 'src/app/classes/ManageInventory';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.css']
})
export class ManageInventoryComponent implements OnInit {
  manageInventorys :Array<any> = []
  constructor(
    private dataService : DataService
) { }

  ngOnInit(): void {
    this.dataService.setTitle('Manage-inventory')
    this.loadManageInventory()
  }

  loadManageInventory(){
    this.dataService.__post('/products',{})
    .subscribe(
      (inventorys:Array<any>)=>{        
        this.manageInventorys = inventorys;
        

      },
      (error)=>{
        this.dataService.showAlert('error','Error',error)
      }
    )
  }

}
