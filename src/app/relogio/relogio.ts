export class Relogio {
    minutos: number = 0;
    segundos: number = 0;
    incrementoMinutos: number = 0;
    incrementoSegundos: number = 0;

    tempo: number = 0;
    tempoIncremento: number = 0;

    calcularTempo(){
        this.tempo = (this.minutos * 60 * 10) + (this.segundos * 10);
        this.tempoIncremento = (this.incrementoMinutos * 60 * 10) + (this.incrementoSegundos * 10);
    }
}