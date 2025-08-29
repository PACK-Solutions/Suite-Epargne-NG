import { Component, ChangeDetectionStrategy, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PshCardComponent } from '@lib/components/card/card.component';
import { InfoCardData, InfoCardOptions } from './info-card.types';

@Component({
  selector: 'psh-info-card',
  standalone: true,
  imports: [CommonModule, PshCardComponent],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PshInfoCardComponent {
  // Inputs
  title = input<string>('');
  data = input<InfoCardData[]>([]);
  options = input<InfoCardOptions>({
    showEmptyState: true,
    emptyStateMessage: 'Aucune information disponible',
    labelWidth: undefined,
    valueWidth: undefined
  });

  // Model inputs
  cardVariant = model<'default' | 'outlined' | 'elevated'>('outlined');
  icon = input<string>('circle-dashed');
  
  // Computed
  shouldShowEmptyState = computed(() => {
    return this.options().showEmptyState && (!this.data() || this.data().length === 0);
  });

  getEmptyStateMessage = computed(() => {
    return this.options().emptyStateMessage || 'Aucune information disponible';
  });
  
  titleIcon = computed(() => {
    return `ph-${this.icon()}`;
  });
}