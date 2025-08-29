import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { InsurerContextService } from '../context/insurer-context.service';
import { InsurerCode } from '../config/insurer.token';

@Directive({
  selector: '[ngIfInsurer]',
  standalone: true
})
export class NgIfInsurerDirective {
  private vcRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private insurerContextService = inject(InsurerContextService);
  
  private hasView = false;
  private insurerCodes: InsurerCode[] = [];
  
  @Input() set ngIfInsurer(value: InsurerCode | InsurerCode[]) {
    this.insurerCodes = Array.isArray(value) ? value : [value];
    this.updateView();
  }
  
  private updateView(): void {
    const currentInsurerCode = this.insurerContextService.insurerCode();
    const isMatch = this.insurerCodes.includes(currentInsurerCode);
    
    if (isMatch && !this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isMatch && this.hasView) {
      this.vcRef.clear();
      this.hasView = false;
    }
  }
}