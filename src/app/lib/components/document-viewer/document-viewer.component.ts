import { ChangeDetectionStrategy, Component, computed, inject, input, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PshButtonComponent } from '@lib/components/button/button.component';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Document {
  id: number;
  name: string;
  type?: string;
  date: Date;
  url: string;
}

@Component({
  selector: 'psh-document-viewer',
  standalone: true,
  imports: [CommonModule, PshButtonComponent],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private subscription = new Subscription();
  
  // Inputs
  documentList = input<Document[]>([]);
  personId = input<number | null>(null);

  // State
  private currentDocumentIndexSignal = signal(0);
  private fullScreenSignal = signal(false);
  
  // Computed values
  documents = computed(() => this.documentList());
  currentDocumentIndex = computed(() => this.currentDocumentIndexSignal());
  currentDocument = computed(() => {
    const docs = this.documents();
    if (docs.length === 0) return null;
    return docs[this.currentDocumentIndex()];
  });
  fullScreen = computed(() => this.fullScreenSignal());
  
  // Sanitize the URL for the iframe
  safeUrl = computed(() => {
    const document = this.currentDocument();
    if (!document) return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    return this.sanitizer.bypassSecurityTrustResourceUrl(document.url);
  });
  
  // Navigation helpers
  hasPrevious = computed(() => this.currentDocumentIndex() > 0);
  hasNext = computed(() => this.currentDocumentIndex() < this.documents().length - 1);
  
  ngOnInit(): void {
    // Handle route params if needed
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          // We can't modify the input signal directly with .set()
          // Instead, store the route parameter for later use
          const personIdFromRoute = parseInt(id, 10);
          // Check if we need to fetch documents based on this ID
        }

        // Get the document ID from the query params if available
        const documentId = params.get('documentId');
        if (documentId) {
          const index = this.documents().findIndex(doc => doc.id === parseInt(documentId, 10));
          if (index >= 0) {
            this.currentDocumentIndexSignal.set(index);
          }
        }
      })
    );
  }

  goToPreviousDocument(): void {
    if (this.hasPrevious()) {
      this.currentDocumentIndexSignal.update(index => index - 1);
    }
  }

  goToNextDocument(): void {
    if (this.hasNext()) {
      this.currentDocumentIndexSignal.update(index => index + 1);
    }
  }
  
  toggleFullScreen(): void {
    this.fullScreenSignal.update(fullScreen => !fullScreen);
  }
  
  closeViewer(): void {
    const personIdValue = this.personId();
    if (personIdValue !== null) {
      this.router.navigate(['/personnes', personIdValue]);
    } else {
      this.router.navigate(['/personnes']);
    }
  }
  
  formatDate(date: Date | undefined): string {
    if (!date) return 'Date inconnue';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
