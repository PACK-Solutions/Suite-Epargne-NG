import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartData, PieChartConfig, PieChartSegment } from './pie-chart.types';

// Default configuration
const DEFAULT_CONFIG: PieChartConfig = {
  width: 400,
  height: 400,
  margin: 40,
  tooltipFormat: 'percentage',
  showLegend: true,
  legendPosition: 'right',
  interactive: true
};

// Default data
const DEFAULT_DATA: PieChartData[] = [
  { label: 'Segment 1', value: 30, index: 0, color: 'var(--primary-color)' },
  { label: 'Segment 2', value: 25, index: 1, color: 'var(--secondary-color)' },
  { label: 'Segment 3', value: 20, index: 2, color: 'var(--success-color)' },
  { label: 'Segment 4', value: 15, index: 3, color: 'var(--warning-color)' }
];

@Component({
  selector: 'psh-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PshPieChartComponent {
  // Model inputs with defaults
  config = model<PieChartConfig>(DEFAULT_CONFIG);
  data = model<PieChartData[]>(DEFAULT_DATA);

  // State
  hoveredIndex = model<number | null>(null);
  hiddenSegments = model<Set<number>>(new Set());
  private tooltipWidthSignal = signal(160);

  // Computed values
  tooltipWidth = computed(() => this.tooltipWidthSignal());

  center = computed(() => ({
    x: this.config().width / 2,
    y: this.config().height / 2,
  }));

  radius = computed(() =>
    Math.min(this.config().width, this.config().height) / 2 - this.config().margin
  );

  segments = computed(() => {
    const visibleData = this.data().filter(
      (item) => !this.hiddenSegments().has(item.index)
    );
    const total = visibleData.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
      this.hiddenSegments.set(new Set());
      return this.calculateSegments(this.data(), total);
    }

    return this.calculateSegments(visibleData, total);
  });

  private calculateSegments(data: PieChartData[], total: number): PieChartSegment[] {
    let startAngle = 0;
    return data.map((item) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 2 * Math.PI;
      const endAngle = startAngle + angle;

      const segment: PieChartSegment = {
        ...item,
        startAngle,
        endAngle,
        percentage,
        path: this.calculatePath(startAngle, endAngle),
      };

      startAngle = endAngle;
      return segment;
    });
  }

  private calculatePath(startAngle: number, endAngle: number): string {
    const radius = this.radius();
    const start = {
      x: radius * Math.cos(startAngle),
      y: radius * Math.sin(startAngle),
    };

    const end = {
      x: radius * Math.cos(endAngle),
      y: radius * Math.sin(endAngle),
    };

    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  }

  getTooltipPosition(segment: PieChartSegment) {
    const angle = (segment.startAngle + segment.endAngle) / 2;
    const distance = this.radius() * 0.6;

    return {
      x: this.center().x + Math.cos(angle) * distance,
      y: this.center().y + Math.sin(angle) * distance,
    };
  }

  onSegmentHover(index: number): void {
    this.hoveredIndex.set(index);
  }

  onSegmentLeave(): void {
    this.hoveredIndex.set(null);
  }

  getSegmentPercentage(index: number): number {
    const segment = this.segments().find((s) => s.index === index);
    return segment?.percentage || 0;
  }

  toggleSegment(index: number): void {
    if (!this.config().interactive) return;

    const newHiddenSegments = new Set(this.hiddenSegments());
    const totalSegments = this.data().length;
    const currentlyHidden = newHiddenSegments.size;

    if (newHiddenSegments.has(index)) {
      newHiddenSegments.delete(index);
    } else {
      if (currentlyHidden >= totalSegments - 1) {
        return;
      }
      newHiddenSegments.add(index);
    }

    this.hiddenSegments.set(newHiddenSegments);
  }

  formatValue(value: number, percentage: number): string {
    switch (this.config().tooltipFormat) {
      case 'value':
        return value.toString();
      case 'percentage':
        return `${percentage.toFixed(1)}%`;
      case 'both':
        return `${value} (${percentage.toFixed(1)}%)`;
      default:
        return `${percentage.toFixed(1)}%`;
    }
  }
}