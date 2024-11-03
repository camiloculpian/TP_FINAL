import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import type { OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, IonCol, AlertController, IonButton, IonGrid, IonRow, IonThumbnail } from '@ionic/angular/standalone';



export interface Rubro{
  id: number;
  codigo: string;
  descripcion: string;
  descripcion_l : string
}

@Component({
  selector: 'rubro-select',
  templateUrl: 'rubro-select.page.html',
  imports: [IonCol, IonAvatar, IonItem, IonLabel, IonInput, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonGrid, IonRow, IonThumbnail, NgFor],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RubroSelectPage implements OnInit {
  @Input() rubros: Rubro[] = [];
  @Input() selectedRubros: string[] = [];
  @Input() title = 'Select Rubros';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredRubros: Rubro[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredRubros = [...this.rubros];
    this.workingSelectedValues = [...this.selectedRubros];
  }

  trackRubros(index: number, rubro: Rubro) {
    return rubro.id;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(ev:any) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredRubros = [...this.rubros];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which rubros
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredRubros = this.rubros.filter((rubro) => {
        return rubro.descripcion.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((rubro) => rubro === value);
  }

  checkboxChange(ev:any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((rubro) => rubro !== value);
    }
  }
}