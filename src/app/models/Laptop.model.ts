export class Laptop {

  photos: string[];

  constructor(public marque: string, public model: string, public serie: string, public couleur: string,
              public cpu: string, public gpu: string, public ram: string, public typeDisque: string, public tailleDisque: string,
              public tailleEcran: number, public connectivity: string[], public typePort: string, public nbrePort: number,
              public dimension: string, public poids: number, public description: string[], public etoiles: number, public prix: number,
              public quantity: number, public viible: boolean) {}
}
