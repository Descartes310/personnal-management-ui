import { Injectable, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {


    @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor(
      private translateService: TranslateService
    ) { }

    setLang(value: string) {
        this.fire.emit(value);
    }

    getEmittedValue() {
        return this.fire;
    }

    changeLang(value) {
        this.translateService.setDefaultLang(value);
        this.translateService.use(value);
        this.setLang(value);

    }

}