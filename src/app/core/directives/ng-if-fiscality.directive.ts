import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { InsurerContextService } from '../context/insurer-context.service';

@Directive({
  selector: '[ngIfFiscality]',
  standalone: true
})
export class NgIfFiscalityDirective {
  private vcRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private insurerContextService = inject(InsurerContextService);
  
  private hasView = false;
  private fiscalityCodes: string[] = [];
  
  @Input() set ngIfFiscality(value: string | string[]) {
    this.fiscalityCodes = Array.isArray(value) ? value : [value];
    this.updateView();
  }
  
  private updateView(): void {
    const isSupported = this.fiscalityCodes.some(code => 
      this.insurerContextService.supportsFiscality(code)
    );
    
    if (isSupported && !this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isSupported && this.hasView) {
      this.vcRef.clear();
      this.hasView = false;
    }
  }
}