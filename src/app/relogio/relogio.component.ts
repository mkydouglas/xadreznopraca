import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription, Timestamp } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { ConfirmacaoDialogComponent } from './confirmacao-dialog/confirmacao-dialog.component';
import { Relogio } from './relogio';
import { SugestaoPlataformaDialogComponent } from './sugestao-plataforma-dialog/sugestao-plataforma-dialog.component';
import { TempoDialogComponent } from './tempo-dialog/tempo-dialog.component';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent implements OnInit, AfterViewInit ,OnDestroy {
  @ViewChild('acima') acimaDiv!: ElementRef<HTMLElement>;
  @ViewChild('abaixo') abaixoDiv!: ElementRef<HTMLElement>;
  divAcima!: HTMLElement;
  divAbaixo!: HTMLElement;

  jogoIniciado = false;
  
  private tempoBrancasSubscription: Subscription | null = null;
  private tempoBrancasSobra = 9;
  private tempoBrancas: number = 0;
  private relogioBrancasAtivo = false;
  
  private tempoNegrasSubscription: Subscription | null = null;
  private tempoNegrasSobra = 9;
  private tempoNegras: number = 0;
  private relogioNegrasAtivo = false;

  public tempoBrancasFormatado = this.formatarTempo(this.tempoBrancas);
  public tempoNegrasFormatado = this.formatarTempo(this.tempoNegras);
  relogio!: Relogio;
  qtdeMovimentosBrancas = 0;
  qtdeMovimentosNegras = 0;
  isDesktop!: boolean;

  constructor(
    public dialog: MatDialog,
    public dispositivoService: DispositivoService
  ){}

  ngOnInit(): void {
    this.isDesktop = this.dispositivoService.isDesktop();   
  }

  ngAfterViewInit(): void {
    if(this.isDesktop)
      this.abrirSugestaoPlataforma();
    
    this.divAcima = this.acimaDiv.nativeElement;
    this.divAbaixo = this.abaixoDiv.nativeElement;
  }

  ngOnDestroy(): void {
    this.pararRelogio();
  }

  manipularRelogio(jogador: number){
    if(this.tempoBrancas == 0 && this.tempoNegras == 0){
      this.abrirTempoDialog();
      return;
    }

    if(!this.tempoBrancas || !this.tempoNegras){
      this.reiniciarRelogio();
      return;
    }

    this.jogoIniciado = this.jogoIniciado ? this.jogoIniciado : !this.relogioBrancasAtivo && !this.relogioNegrasAtivo;

    if(jogador == 1 && (this.jogoIniciado || this.relogioBrancasAtivo)){
      this.tempoNegrasSubscription?.unsubscribe();
      this.tempoNegrasSubscription = null;
      this.relogioBrancasAtivo = false;
      this.relogioNegrasAtivo = true;
      this.divAbaixo.classList.add('relogio__ativo');
      this.divAcima.classList.remove('relogio__ativo');
      this.contadorNegras();
      if(this.relogio.tempoIncremento > 0 && this.tempoBrancas != this.relogio.tempo){
        this.tempoBrancas += this.relogio.tempoIncremento;
        this.tempoBrancasFormatado = this.formatarTempo(this.tempoBrancas);
      }
      if(this.tempoBrancas != this.relogio.tempo)
        this.qtdeMovimentosBrancas++;
    }
    else if(jogador == 2 && (this.jogoIniciado || this.relogioNegrasAtivo)){
      this.tempoBrancasSubscription?.unsubscribe();
      this.tempoBrancasSubscription = null;
      this.relogioBrancasAtivo = true;
      this.relogioNegrasAtivo = false;
      this.divAcima.classList.add('relogio__ativo');
      this.divAbaixo.classList.remove('relogio__ativo');
      this.contadorBrancas();
      if(this.relogio.tempoIncremento > 0 && this.tempoNegras != this.relogio.tempo){
        this.tempoNegras += this.relogio.tempoIncremento;
        this.tempoNegrasFormatado = this.formatarTempo(this.tempoNegras);
      }
      if(this.tempoNegras != this.relogio.tempo)
        this.qtdeMovimentosNegras++;
    }
  }

  pararRelogio(){    
    this.cancelarSubscription(this.tempoBrancasSubscription);
    this.cancelarSubscription(this.tempoNegrasSubscription);
    this.removerClasseRelogioAtivo();
  }

  async reiniciarRelogio(){
    this.pararRelogio();
    const confirmacao = await this.abrirConfirmacaoDialog();    
    if(!confirmacao)
      return;
    
    this.removerClasseRelogioFim();
    this.inserirTempo();
    this.reiniciarQtdeMovimentos();
  }

  contadorBrancas(){
    if(this.tempoBrancasSubscription === null) {
      this.tempoBrancasSubscription = interval(100).subscribe(() => {
        if(this.relogioBrancasAtivo){
          if(this.tempoBrancasSobra > 0)
            this.tempoBrancasSobra--;  
          else{
            if(this.tempoBrancas)
              this.tempoBrancas--;
            else
              this.terminarJogo();
          }

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
          else{
            if(this.tempoNegras)
              this.tempoNegras--;
            else
              this.terminarJogo();
          }
  
          this.tempoNegrasFormatado = this.formatarTempo(this.tempoNegras);
        }
      });
    }
  }
  
  abrirTempoDialog(): void {
    this.pararRelogio();

    const tempoDialog = this.dialog.open<TempoDialogComponent, any, Relogio>(TempoDialogComponent, {
      panelClass: 'popup'
    });

    tempoDialog.afterClosed().subscribe(result => {
      if (result) {
        this.relogio = Object.assign(new Relogio, result);
        this.relogio.calcularTempo();
        this.removerClasseRelogioFim();
        this.inserirTempo();
        this.reiniciarQtdeMovimentos();
      }
    });
  }

  abrirConfirmacaoDialog(): Promise<boolean>{
    return new Promise<boolean>((resolve) => {
      const confDialog = this.dialog.open(ConfirmacaoDialogComponent, {
      });
  
      confDialog.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }

  abrirSugestaoPlataforma(){
    this.dialog.open(SugestaoPlataformaDialogComponent, { });
  }

  formatarTempo(tempo: number) {
    const milliseconds = tempo;
    const seconds = Math.floor((tempo / 10) % 60);
    const minutes = Math.floor((tempo / (10 * 60)) % 60);
    const horas = Math.floor((tempo / (10 * 60 * 60)) % 60);

    if(horas > 0)
      return `${this.pad(horas, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
    else if(minutes == 0 && seconds < 10)
      return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${this.pad(milliseconds, 1)}`
    else
      return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
  }

  private pad(num: number, size: number): string {
    let s = "000" + num;
    return s.substr(s.length - size);
  }

  inserirTempo(){
    this.tempoBrancasSobra = this.tempoNegrasSobra = 9;
    this.tempoBrancas = this.tempoNegras = this.relogio.tempo;
    this.tempoBrancasFormatado = this.tempoNegrasFormatado = this.formatarTempo(this.relogio.tempo);
  }

  reiniciarQtdeMovimentos() {
    this.qtdeMovimentosBrancas = this.qtdeMovimentosNegras = 0;
  }

  cancelarSubscription(subscription: Subscription | null){
    subscription?.unsubscribe();
    subscription = null;
  }

  removerClasseRelogioAtivo(){
    this.divAcima.classList.remove('relogio__ativo');
    this.divAbaixo.classList.remove('relogio__ativo');
  }

  removerClasseRelogioFim(){
    this.divAcima.classList.remove('relogio__fim');
    this.divAbaixo.classList.remove('relogio__fim');
  }

  terminarJogo() {
    if(this.divAcima.classList.contains('relogio__ativo')){      
      this.divAcima.classList.remove('relogio__ativo');
      this.divAcima.classList.add('relogio__fim');
    }
    else{
      this.divAbaixo.classList.remove('relogio__ativo');
      this.divAbaixo.classList.add('relogio__fim');
    }
    
    this.cancelarSubscription(this.tempoBrancasSubscription);
    this.cancelarSubscription(this.tempoNegrasSubscription);
  }
}
