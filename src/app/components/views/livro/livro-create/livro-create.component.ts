import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  
  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  
  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(3)]);

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro na criação do livro!');
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage(field: string) {
    let anyInvalid = this.titulo.invalid || this.texto.invalid || this.nomeAutor.invalid;
    
    if (this.titulo.invalid && field == "titulo") {
      return "O campo TITULO deve conter entre 3 e 100 caracteres!";
    }

    if (this.nomeAutor.invalid && field == "nomeAutor") {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres!";
    }

    if (this.texto.invalid && field == "texto") {
      return "O campo TEXTO deve conter entre 3 e 2.000.000 caracteres!";
    }

    if (anyInvalid && field == "button") {
      return true;
    }
    return false
  }
}
