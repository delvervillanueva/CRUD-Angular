import { Component, OnInit } from '@angular/core';
import { CucService } from '../../services/cuc.service';
import { Items } from '../../items';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: [
  ]
})
export class ItemsComponent  {

   items: Items [] = [];
   items_locales: Object;
   cargando = false;

   first = 0;

   rows = 5;

  constructor(private cucService: CucService) {}

  ngOnInit() {

    this.cargando = true;

    /* this.cucService.obtenerItems().then(cars => this.items = cars); */
    this.cucService.obtenerItems()
    .subscribe((resp: any) => {
      console.log(resp);
      this.items = resp;
      this.cargando = false;
    },
    err =>{
      console.log(err);
    });


    this.obtenerItems();
}

next() {
  this.first = this.first + this.rows;
}

prev() {
  this.first = this.first - this.rows;
}

reset() {
  this.first = 0;
}

isLastPage(): boolean {
  return this.items ? this.first === (this.items.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.items ? this.first === 0 : true;
}

obtenerItems(){
    this.cucService.ObtenerItemsLocal()
    .subscribe(res=>{
      this.items_locales = res
    });
  }

  eliminarItem(items){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que quiere eliminar a ${items.title}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp=>{
      if(resp.value){

        this.cucService.eliminarItem(items)
        .subscribe((res) =>{
          this.obtenerItems();
        });
      }

    });


  }



}
