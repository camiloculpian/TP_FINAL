import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import type { OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, ModalController, IonRow } from '@ionic/angular/standalone';
import { RubrosService } from 'src/app/core/services/rubros.service';


export interface Rubro{
  id: number;
  codigo: string;
  descripcion: string;
  descripcion_l : string
}

@Component({
  selector: 'app-rubro-select',
  templateUrl: './rubro-select.page.html',
  styleUrl: './rubro-select.page.scss',
  standalone: true,
  imports: [IonRow, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RubroSelectPage implements OnInit {
  @Input() rubros: Rubro[] = [];
  @Input() selectedRubros: Rubro[] = [];
  @Input() title = 'Seleccione Rubros';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<Rubro[]>();

  filteredRubros: Rubro[] = [];
  workingSelectedValues: Rubro[] = [];

  constructor(
    private rubrosService : RubrosService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // console.log('export class RubroSelectPage -> OnInit')
    this.rubrosService.getRubros().subscribe(
      {
        next: (resp) => {
          this.rubros = [...resp?.data];
          this.filteredRubros = [...this.rubros];
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
    this.workingSelectedValues = [...this.selectedRubros];
    // console.log('export class RubroSelectPage <- OnInit')
  }

  trackRubros(index: number, rubro: Rubro) {
    return rubro.codigo;
  }

  cancelChanges() {
    this.selectionCancel.emit();
    this.modalController.dismiss();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
    this.modalController.dismiss(this.workingSelectedValues)
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

  isChecked(rubro_id: number) {
    return this.workingSelectedValues.find((rubro) => rubro.id === rubro_id );
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