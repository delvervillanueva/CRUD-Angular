import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Items } from '../items';

@Injectable({
  providedIn: 'root'
})
export class CucService {

  private urlApi = 'https://datos.gob.es/apidata/catalog/distribution';

  constructor(private http: HttpClient) { }

  obtenerItems(){

    return this.http.get(this.urlApi)
    .pipe(
      map( resp => resp['result'].items)
    );

  }

  crearItem(item: Items){
    return this.http.post('http://localhost:3000/items', item)
    .pipe(
      map( (resp: any)=>{
        item.id = resp.id;
        return item;
      } )
    )
  }

  actualizarHeroe(items){

    const heroeTemp = {
      ...items
    };

    delete heroeTemp.id;
    return this.http.put('http://localhost:3000/items/' + items.id, heroeTemp);
  }

  obtenerItem(id: string){

    return this.http.get(`http://localhost:3000/items/${id}`);
  }

  ObtenerItemsLocal(){
    return this.http.get('http://localhost:3000/items');
  }

  eliminarItem(items){
    return this.http.delete('http://localhost:3000/items/' + items.id);
  }

}
