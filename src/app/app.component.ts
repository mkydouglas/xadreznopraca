import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'XadrezNoPraca';

  ngAfterViewInit(): void {
    const menuHamburguer = document.getElementById("menu-hamburguer") as HTMLInputElement;
    const menuBox = document.querySelector(".menu__box") as HTMLElement;
    const menuPadrao = document.querySelector(".menu__padrao") as HTMLElement;
    const boxLogo = document.querySelector(".box__logo") as HTMLElement;
    const menuLinks = document.querySelector(".menu__links") as HTMLElement;

    menuHamburguer.addEventListener("change", function(){
      if (menuHamburguer.checked) {
        menuBox.classList.add("menu__box-active");
        menuPadrao.classList.add("menu__padrao-active");
        boxLogo.classList.add("box__logo-active");
        menuLinks.classList.add("menu__links-active");
        
      } else {
        menuBox.classList.remove("menu__box-active");
        menuPadrao.classList.remove("menu__padrao-active");
        boxLogo.classList.remove("box__logo-active");
        menuLinks.classList.remove("menu__links-active");
      }
    });
  }
}
