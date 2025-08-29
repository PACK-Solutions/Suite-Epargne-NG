# Modal Component Documentation

## Installation et Utilisation

### Installation

1. Installer le package via npm :
```bash
npm install @ps/helix
```

2. Importer le composant dans votre module ou composant standalone :
```typescript
import { LibModalComponent } from '@ps/helix';

@Component({
  // ...
  imports: [LibModalComponent],
  // ...
})
```

### Utilisation de Base

```typescript
@Component({
  template: `
    <!-- Modal basique -->
    <lib-modal
      [(open)]="isOpen"
      title="MODAL.TITLE"
      (confirmed)="handleConfirm()"
    >
      Contenu de la modale
    </lib-modal>

    <!-- Modal avec footer personnalisé -->
    <lib-modal [(open)]="isOpen">
      Contenu de la modale
      <div modal-footer>
        <lib-button variant="text" (clicked)="handleCancel()">
          {{ 'MODAL.CANCEL' | translate }}
        </lib-button>
        <lib-button variant="primary" (clicked)="handleConfirm()">
          {{ 'MODAL.CONFIRM' | translate }}
        </lib-button>
      </div>
    </lib-modal>
  `
})
export class ExampleComponent {
  isOpen = false;

  handleConfirm() {
    console.log('Modal confirmed');
    this.isOpen = false;
  }
}
```

### API

#### Model Inputs (@model)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| open | boolean | false | État d'ouverture |
| size | ModalSize | 'medium' | Taille de la modale |

#### Regular Inputs (@input)
| Nom | Type | Défaut | Description |
|-----|------|---------|-------------|
| title | string | '' | Titre de la modale |
| showClose | boolean | true | Affiche le bouton de fermeture |
| closeOnBackdrop | boolean | true | Ferme au clic sur l'arrière-plan |
| closeOnEscape | boolean | true | Ferme avec la touche Échap |
| preventScroll | boolean | true | Empêche le scroll de la page |
| showFooter | boolean | true | Affiche le footer |
| dismissLabel | string | 'MODAL.CLOSE' | Label du bouton de fermeture |
| confirmLabel | string | 'MODAL.CONFIRM' | Label du bouton de confirmation |
| cancelLabel | string | 'MODAL.CANCEL' | Label du bouton d'annulation |

#### Outputs
| Nom | Type | Description |
|-----|------|-------------|
| closed | EventEmitter<void> | Émis à la fermeture |
| confirmed | EventEmitter<void> | Émis à la confirmation |

### Configuration Globale

```typescript
@Component({
  providers: [
    {
      provide: MODAL_CONFIG,
      useValue: {
        size: 'medium',
        showClose: true,
        closeOnBackdrop: true,
        closeOnEscape: true,
        preventScroll: true,
        showFooter: true
      }
    },
    {
      provide: MODAL_STYLES,
      useValue: {
        'custom-modal': {
          borderWidth: '2px'
        }
      },
      multi: true
    }
  ]
})
```

## États et Modificateurs

### Tailles
- `small`: Pour les messages courts
- `medium`: Taille par défaut
- `large`: Pour plus de contenu

### États
- `open`: État d'ouverture
- `loading`: État de chargement
- `disabled`: État désactivé

## Accessibilité

### Attributs ARIA
- `role="dialog"`: Rôle de dialogue
- `aria-modal="true"`: Indique une modale
- `aria-labelledby`: Lien vers le titre
- `aria-hidden`: État de visibilité

### Bonnes Pratiques
- Focus piégé dans la modale
- Retour au focus précédent
- Support de la touche Échap
- Labels traduits

## Bonnes Pratiques

1. **Hiérarchie Visuelle**
   - Titre clair et descriptif
   - Actions principales mises en avant
   - Contenu bien structuré

2. **Accessibilité**
   - Labels descriptifs
   - Support du clavier
   - États ARIA appropriés

3. **Performance**
   - Gestion efficace du scroll
   - Détection de changements OnPush
   - Nettoyage des ressources

4. **Internationalisation**
   - Labels traduits
   - Messages d'erreur traduits
   - Support RTL/LTR