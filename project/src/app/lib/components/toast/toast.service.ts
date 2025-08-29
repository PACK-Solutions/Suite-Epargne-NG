import { Injectable, inject, signal } from '@angular/core';
import { TOAST_CONFIG, TOAST_STYLES } from './toast.component';
import { Toast, ToastPosition, ToastConfig } from './toast.types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private positionSignal = signal<ToastPosition>('top-right');
  private config = inject(TOAST_CONFIG);
  private customStyles = inject(TOAST_STYLES, { optional: true }) ?? [];

  /**
   * Récupère la configuration du toast
   */
  getConfig(): Partial<ToastConfig> {
    return this.config;
  }

  /**
   * Récupère les styles personnalisés
   */
  getCustomStyles(): Record<string, string>[] {
    return this.customStyles;
  }

  /**
   * Récupère la position actuelle
   */
  getPosition() {
    return this.positionSignal;
  }

  /**
   * Récupère les toasts actifs
   */
  getToasts() {
    return this.toasts;
  }

  /**
   * Affiche un nouveau toast
   */
  show(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = {
      ...toast,
      id,
      type: toast.type || 'info',
      duration: toast.duration ?? this.config.duration ?? 5000
    };

    // Limiter le nombre de toasts
    const maxToasts = this.config.maxToasts ?? 5;
    this.toasts.update(toasts => {
      const currentToasts = [...toasts];
      while (currentToasts.length >= maxToasts) {
        currentToasts.shift();
      }
      return [...currentToasts, newToast];
    });

    // Auto-suppression si durée > 0
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => this.remove(id), newToast.duration);
    }

    return id;
  }

  /**
   * Supprime un toast
   */
  remove(id: string) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  /**
   * Change la position des toasts
   */
  setPosition(position: ToastPosition) {
    this.positionSignal.set(position);
  }
}