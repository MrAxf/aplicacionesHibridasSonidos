import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../models/Animal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal[];
  audio = new Audio();
  tiempoAudio: any;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);

  }

  reproducir(animal: Animal) {
    console.log(animal);

    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    animal.reproduciendo = true;
    this.audio.load();
    this.audio.play();

    this.tiempoAudio = setTimeout(() => {
      animal.reproduciendo = false;
    }, animal.duracion * 1000);
  }

  private pausarAudio(animalSeleccionado: Animal) {
    clearTimeout(this.tiempoAudio);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  doRefresh(refresher: any) {
    console.log("Inicio del refresh");
    this.animales = ANIMALES;

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
