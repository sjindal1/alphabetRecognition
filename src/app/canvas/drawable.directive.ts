import {
    Directive,
    HostListener,
    HostBinding,
    ElementRef,
    Output,
    EventEmitter,
    OnInit
  } from '@angular/core';

@Directive({
    selector: '[drawable]'
    })
export class DrawableDirective implements OnInit {

    pos = { x: 0, y: 0 };
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor(private el: ElementRef) {}

  @Output() newImage = new EventEmitter();

  @Output() clearImage = new EventEmitter();

  ngOnInit() {
    console.log("Inside drawable directive");
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  @HostListener('pointerup', ['$event'])
  onUp(e) {
    this.newImage.emit(this.getImgData());
  }

  @HostListener('pointerenter', ['$event'])
  onEnter(e) {
    this.setPosition(e);
  }

  @HostListener('pointerdown', ['$event'])
  onMove(e) {
    this.setPosition(e);
  }

  @HostListener('pointermove', ['$event'])
  onDown(e) {

    if (e.buttons !== 1) {
      return;
    }

    this.ctx.beginPath(); // begin
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }

  @HostListener('resize', ['$event'])
  onResize(e) {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  setPosition(e) {
    this.pos.x = e.offsetX;
    this.pos.y = e.offsetY;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.clearImage.emit(true);
  }

  getImgData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    return this.ctx.getImageData(0, 0, 28, 28);
  }
}