import { NgModule } from '@angular/core';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PopupAnchorDirective } from './popup.anchor-target.directive.ts';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { SVGIconModule } from '@progress/kendo-angular-icons';

@NgModule({
  declarations: [
    PopupAnchorDirective
  ],
  imports: [
  ],
  exports:[
    PopupAnchorDirective,
    ButtonsModule,
    GridModule,
    DatePickerModule,
    DialogModule,
    InputsModule,
    UploadModule,
    PopupModule,
    NotificationModule,
    ComboBoxModule,
    ListViewModule,
    SVGIconModule
  ]
})
export class KendoSharedModule { }
