import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import type { OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, ModalController, IonRow } from '@ionic/angular/standalone';
import { Rubro } from 'src/app/core/interfaces/rubro';
import { RubrosService } from 'src/app/core/services/rubros.service';
// import { RubrosService } from 'src/app/core/services/rubros.service';

@Component({
  selector: 'app-rubro-select',
  templateUrl: './rubro-select.page.html',
  styleUrl: './rubro-select.page.scss',
  standalone: true,
  imports: [IonRow, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RubroSelectPage implements OnInit {
  buttonDisabled:boolean= false;
  @Input() rubros: Rubro[] = [];
  @Input() selectedRubros: Rubro[] = [];
  @Input() title = 'Seleccione Rubros';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<Rubro[]>();

  filteredRubros: Rubro[] = [];
  workingSelectedValues: Rubro[] = [];

  constructor(
    private modalController: ModalController,
    private rubrosService: RubrosService
  ) { }

  ngOnInit() {
    console.log('export class RubroSelectPage -> OnInit')
    if(this.rubros.length == 0)
      {
        // TO-DO: descargar la lista de rubros una vez y guardarla en el local storage para que no tenga que descargarla seguido
        // se podria agregar un timestamp para que si es muy vieja la lista vuelva a descargarla > 48hs pej.
        this.buttonDisabled =true;
        this.rubrosService.getRubros().subscribe(
          {
            next: (resp) => {
              this.rubros = [...resp?.data];
              this.filterList('');
              this.buttonDisabled =false;
            },
            error: (err) => {
              // TO-DO: enviarte alert del error si lo hubiera...
              console.log(err)
              this.buttonDisabled =false;
            }
          }
        )
      }
    this.filteredRubros = [...this.rubros];
    this.workingSelectedValues = [...this.selectedRubros];
    console.log('export class RubroSelectPage <- OnInit')
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
    console.log(ev.detail)
    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((rubro) => rubro.id !== value.id);
    }
  }
}