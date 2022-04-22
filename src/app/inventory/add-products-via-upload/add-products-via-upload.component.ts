import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service'

@Component({
  selector: 'app-add-products-via-upload',
  templateUrl: './add-products-via-upload.component.html',
  styleUrls: ['./add-products-via-upload.component.css']
})

export class AddProductsViaUploadComponent implements OnInit {

  @Input() 'app-add-products-via-upload': any;


  constructor(private http: DataService, private elementRef: ElementRef) {

  }

  datas: any;

  @ViewChild('mainDiv') mainDiv!: ElementRef;

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.spinner = true;
    this.http.uploded_product_list_data().subscribe((result: any) => {
      this.datas = result.data;

      // console.log("data from server", this.datas);
      this.spinner = false
    }, (error) => {
      this.spinner = false
      this.http.showAlert('error', 'Error', error);
    })
  }


  newData: any;
  newData1: any;
  newData2: any;
  newData3: any;
  newData4:any
  viewList = false;
  viewList1 = false;
  viewList2 = false;
  viewList3 = false;
  viewList4 = false;
  spinner = false;
  // parentsArray: any = [];

  viewChild(index: any, id: any) {
    this.newData = this.datas[index].children;
    if (this.newData.length > 0) {
      this.viewList = true;
    } else {
    }
    this.viewList1 = false;
    this.viewList2 = false;
    this.viewList3 = false;

    // this.parentsArray = this.getPath(this.datas[0], id);
    // this.parentsArray.push(id);


  }
  viewChild1(index: any, id: any) {
    this.newData1 = this.newData[index].children;
    if (this.newData1.length > 0) {
      this.viewList1 = true;
    } else {
      this.viewList1 = false;
    }
    this.viewList2 = false;
    this.viewList3 = false;

    // this.parentsArray = this.getPath(this.datas[0], id);
    // this.parentsArray.push(id);
  }
  viewChild2(index: any, id: any) {
    this.newData2 = this.newData1[index].children;
    if (this.newData2.length > 0) {
      this.viewList2 = true;
    } else {
      this.viewList2 = false;
    }
    this.viewList3 = false;

    // this.parentsArray = this.getPath(this.datas[0], id);
    // this.parentsArray.push(id);
  }
  viewChild3(index: any, id: any) {
    this.newData3 = this.newData2[index].children;
    if (this.newData3.length > 0) {
      this.viewList3 = true;
    } else {
      this.viewList3 = false;
    }

    // this.parentsArray = this.getPath(this.datas[0], id);
    // this.parentsArray.push(id);
  }
  viewChild4(index: any, id: any) {
    this.newData4 = this.newData3[index].children;
    if (this.newData4.length > 0) {
      this.viewList4 = true;
    } else {
      this.viewList4 = false;
    }

    // this.parentsArray = this.getPath(this.datas[0], id);
    // this.parentsArray.push(id);
  }

  // path: any
  // getPath(model: any, id: any) {

  //   var item = model.id;

  //   if (!model || typeof model !== 'object') return;

  //   if (model.id === id) return [item];

  //   (model.children || []).some((child: any) => this.path = this.getPath(child, id));

  //   return this.path && [item, ...this.path];

  // }

  // checkId(id: any) {
  //   console.log(this.parentsArray);
  //   console.log(this.parentsArray.includes(id));

  //   return this.parentsArray.includes(id)
  // }


  // viewChild(index: any, data: any) {
  //   console.log(data)
  //   if (data.children.length > 0) {
  //     let list = '';
  //     for (let i = 0; i < data.children.length; i++) {
  //       list = list + `<li>` + data.children[i].data.name + ' <button class="btn p-0" (click)="viewChild(i, data)" >></button></li>';
  //     }
  //     let matcard = `<mat-card class="mat-card mat-focus-indicator"><ul>${list}</ul></mat-card>`;
  //     this.mainDiv.nativeElement.insertAdjacentHTML('beforeend', matcard);
  //   }
  // }

  showChild(id: any) {
    console.log(id);
    let childData = this.datas.find((x: { id: any; }) => x.id == id).children;
    console.log(childData);

    if (childData.length > 0) {
      let list = '';
      for (let i = 0; i < childData.length; i++) {
        list = list + `<li><span>` + childData[i].data.name + ' </span><span class="buttonC" (click)="showChild(data.id)">></span></li>';
      }
      let matcard = `<ul>${list}</ul>`;
      this.mainDiv.nativeElement.insertAdjacentHTML('beforeend', matcard);
    }

    let el = this.elementRef.nativeElement.querySelector('.buttonC');
    if (el) {
      el.addEventListener('click', console.log('works'));
    }

    // $('.buttonC').on("hover",'.buttonC',console.log('workes'))
  }

  selectedId: any
  selectedName: any
  parentId: any
  uplodedFile: any;

  addData(id: any, data: any) {
    if (!data.children.length) {
      this.selectedId = id;
      this.selectedName = data.data.name;
    }
    this.datas.map((el: any) => {
      let path = this.getPath(el, id);
      if (path !== undefined) {
        this.parentId = path[0].id
      }
    })

  }

  getPath(model: any, id: any) {
    var path,
      item = { id: model.id };

    if (!model || typeof model !== 'object') return;

    if (model.id === id) return [item];

    (model.children || []).some((child: any) => path = this.getPath(child, id));
    return path && [item, ...path];

  }

  addFile(e:any) {
    this.uplodedFile = e.target.files[0];
    console.log(this.uplodedFile);
  }

  send_datas = new FormData();
  submitData() {

    this.send_datas.append("parentId",this.parentId);
    this.send_datas.append("id",this.selectedId);
    this.send_datas.append("cvs",this.uplodedFile);

    console.log(this.send_datas);

    this.http.upload_svg(this.send_datas, "/seller/products/csv").subscribe(result => {
      console.log(result);
    })

  }


}
