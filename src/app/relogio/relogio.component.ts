import { Component } from '@angular/core';
import { interval, Subscription, Timestamp } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent {

  jogoIniciado = false;
  
  private tempoBrancasSubscription: Subscription | null = null;
  private tempoBrancasSobra = 9;
  private tempoBrancas: number = 600;
  private relogioBrancasAtivo = false;
  
  private tempoNegrasSubscription: Subscription | null = null;
  private tempoNegrasSobra = 9;
  private tempoNegras: number = 600;
  private relogioNegrasAtivo = false;

  public tempoBrancasFormatado = this.formatarTempo(this.tempoBrancas);
  public tempoNegrasFormatado = this.formatarTempo(this.tempoNegras);

  pausarRelogio(jogador: number){
    debugger
    this.jogoIniciado = this.jogoIniciado ? this.jogoIniciado : !this.relogioBrancasAtivo && !this.relogioNegrasAtivo;

    if(jogador == 1 && (this.jogoIniciado || this.relogioBrancasAtivo)){
      this.tempoNegrasSubscription?.unsubscribe();
      this.tempoNegrasSubscription = null;
      this.relogioBrancasAtivo = false;
      this.relogioNegrasAtivo = true;
      this.contadorNegras();
    }
    else if(jogador == 2 && (this.jogoIniciado || this.relogioNegrasAtivo)){
      this.tempoBrancasSubscription?.unsubscribe();
      this.tempoBrancasSubscription = null;
      this.relogioBrancasAtivo = true;
      this.relogioNegrasAtivo = false;
      this.contadorBrancas();
    }
  }

  despausarRelogio(){
    
  }

  contadorBrancas(){
    if (this.tempoBrancasSubscription === null) {
      this.tempoBrancasSubscription = interval(100).subscribe(() => {
        if(this.relogioBrancasAtivo){
          if(this.tempoBrancasSobra > 0)
          this.tempoBrancasSobra--;  
          else        
            this.tempoBrancas--;
  
          this.tempoBrancasFormatado = this.formatarTempo(this.tempoBrancas);
        }      
      });
    }
  }

  contadorNegras(){
    if (this.tempoNegrasSubscription === null) {
      this.tempoNegrasSubscription = interval(100).subscribe(() => {
        if(this.relogioNegrasAtivo){
          if(this.tempoNegrasSobra > 0)
            this.tempoNegrasSobra--;  
          else
            this.tempoNegras--;
  
          this.tempoNegrasFormatado = this.formatarTempo(this.tempoNegras);
        }
        
      });
    }
  }

  formatarTempo(tempo: number) {
    const milliseconds = tempo;
    const seconds = Math.floor((tempo / 10) % 60);
    const minutes = Math.floor((tempo / (10 * 60)) % 60);
    const horas = Math.floor((tempo / (10 * 60 * 60)) % 60);

    return `${this.pad(horas, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${this.pad(milliseconds, 1)}`;
  }

  private pad(num: number, size: number): string {
    let s = "000" + num;
    return s.substr(s.length - size);
  }
}
