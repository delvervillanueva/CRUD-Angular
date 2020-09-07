import { Component, OnInit } from '@angular/core';
import { Items } from '../../items';
import { CucService } from '../../services/cuc.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  item: Items = new Items();
  items_locales: Object;

  constructor(  private cucService: CucService,
    private router : ActivatedRoute) { }

  ngOnInit(){

    const id = this.router.snapshot.paramMap.get('id');
    if( id !== 'nuevo'){
      this.cucService.obtenerItem(id)
      .subscribe((resp : Items)=>{
        this.item = resp;
        this.item.id = id;
      })
    }

  }

  guardar(form: NgForm){

    if(form.invalid){
      console.log( 'Formulario no Valido' );
      return;
    }
    
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutSideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.item.id){
     peticion = this.cucService.actualizarHeroe(this.item)

    }else{
     peticion = this.cucService.crearItem(this.item)
    }

    peticion.subscribe(resp=>{

      Swal.fire({
        titulo: this.item.tile,
        text: 'Se actualizo Correctamente',
        type: 'success'
      });

    });


  }

}
