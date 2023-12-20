import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent implements OnInit {

  newProduit = new Produit();
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;

  constructor(private produitService: ProduitService,
    private activatedRoute: ActivatedRoute,
              private router :Router,) { }

  ngOnInit(): void {
    //this.categories =this.produitService.listeCategories();
      this.produitService.listeCategories().
      subscribe(cats => {this.categories = cats;
      console.log(cats);
      });
      }

  /* addProduit() {
    console.log(this.newIdCat);
    this.produitService.ajouterProduit(this.newProduit);
    //this.newCategorie=this.produitService.consulterCategorie(this.newIdCat);
    this.newProduit.categorie=this.newCategorie;
    this.router.navigate(['produits']);
 
  } */
  addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit).subscribe(prod => {
      console.log(prod);
    this.router.navigate(['produits']);
    });
    }
    

}
