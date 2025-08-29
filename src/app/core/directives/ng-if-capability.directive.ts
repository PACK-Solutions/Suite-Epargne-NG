import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { FeatureToggleService } from '../context/feature-toggle.service';

@Directive({
  selector: '[ngIfCapability]',
  standalone: true
})
export class NgIfCapabilityDirective {
  private vcRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private featureToggleService = inject(FeatureToggleService);
  
  private hasView = false;
  
  @Input() set ngIfCapability(featureId: string) {
    const isEnabled = this.featureToggleService.isFeatureEnabled(featureId);
    
    if (isEnabled && !this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isEnabled && this.hasView) {
      this.vcRef.clear();
      this.hasView = false;
    }
  }
}