import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  title = 'XadrezNoPraca';
  menuHamburguer!: HTMLInputElement;
  menuBox!: HTMLElement;
  menuPadrao!: HTMLElement;
  boxLogo!: HTMLElement;
  menuLinks!: HTMLElement;

  ngAfterViewInit(): void {
    this.menuHamburguer = document.getElementById("menu-hamburguer") as HTMLInputElement;
    this.menuBox = document.querySelector(".menu__box") as HTMLElement;
    this.menuPadrao = document.querySelector(".menu__padrao") as HTMLElement;
    this.boxLogo = document.querySelector(".box__logo") as HTMLElement;
    this.menuLinks = document.querySelector(".menu__links") as HTMLElement;

    this.menuHamburguer.addEventListener("change", () => {
      if (this.menuHamburguer.checked) {
        this.adicionarClassesMenuHamburguer();        
      } else {
        this.removerClassesMenuHamburguer();
      }
    });

    this.menuLinks.childNodes.forEach(link => {
      link.addEventListener('click', () => {
        if(this.menuHamburguer.checked){
          this.menuHamburguer.checked = false;
          this.removerClassesMenuHamburguer();
        }
      })
    })
  }

  adicionarClassesMenuHamburguer(){
    this.menuBox.classList.add("menu__box-active");
    this.menuPadrao.classList.add("menu__padrao-active");
    this.boxLogo.classList.add("box__logo-active");
    this.menuLinks.classList.add("menu__links-active");
  }

  removerClassesMenuHamburguer() {
    this.menuBox.classList.remove("menu__box-active");
    this.menuPadrao.classList.remove("menu__padrao-active");
    this.boxLogo.classList.remove("box__logo-active");
    this.menuLinks.classList.remove("menu__links-active");
  }
}
