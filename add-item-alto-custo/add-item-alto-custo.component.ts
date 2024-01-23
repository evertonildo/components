import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ComponentBase } from "../shared/ComponentBase";
import { HealthService } from "src/app/shared/health.service";
import { isLocalhost } from "../shared/utils";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-add-item-alto-custo",
  templateUrl: "./add-item-alto-custo.component.html",
  styleUrls: ["./add-item-alto-custo.component.scss"],
})
export class AddItemAltoCustoComponent extends ComponentBase implements OnInit {
  @Input() procedimentoId!: number;
  @Output() close = new EventEmitter();
  @Output() listar = new EventEmitter();
  buscandoDetalhe: boolean = false;
  fornecedores: any[] = [];
  fornecedoresList: any[] = [];

  constructor(
    //public dialogRef: MatDialogRef<AddItemAltoCustoComponent>
    private api: HealthService
  ) {
    super();
    this.inicializeForm();
  }
  inicializeForm() {
    this.formGroup = this.api.formBuilder.group({
      CodigoMaterial: new FormControl(""),
      descricaoMaterial: new FormControl(""),
      lote: new FormControl(""),
      fornecedorId: new FormControl(null),
      comunicadoUso: new FormControl(""),
      fornecedor: new FormControl(""),
    });
  }

  ngOnInit() {
    this.inicializeForm();
    this.api.fornecedores().subscribe({
      next: (data: any) => {
        this.fornecedores = data as any[];
        console.log("fornecedores", this.fornecedores);
      },
    });
  }

  clearFieldForm(fieldname: string) {
    this.formGroup.patchValue({
      [fieldname]: "",
    });
  }

  fornecedoresAutocomplete($event: any) {
    if ($event.srcElement.value !== "")
      this.fornecedoresList = this.fornecedores.filter((x) =>
        x.nickname.toLowerCase().includes($event.srcElement.value.toLowerCase())
      );
  }

  onFornecedoresChange() {
    this.formGroup.patchValue({
      fornecedorId: this.fornecedoresList.find(
        (x) => x.nickname === this.formGroup.value.fornecedor
      )?.id,
    });
    console.info(this.formGroup.value);
  }
  buscaCodigoDetalhe(
    event: any,
    //rowindex: number,
    //element: any,
    value: string
  ) {
    if (isLocalhost) console.log("buscaCodigoDetalhe", event, value);
    let { keyCode } = event;
    if ((keyCode === 13 || keyCode === 9) && value) {
      this.buscandoDetalhe = true;
      this.api.httpGet(`busca-detalhe-por-codigo/${value}`).subscribe({
        next: (details: any) => {
          console.log("details", details);
          if (details) {
            this.buscandoDetalhe = true;
            let data = {
              item: { QtdMaterial: 1, CodigoMaterial: value, id: 0 },
              detail: details,
            };

            if (details?.spendSheetItem) {
              this.buscandoDetalhe = false;
              this.api.showInfo(
                "Link sem Sucesso!",
                "A operação não foi bem sucedida. O código [" +
                  value +
                  "] já está vinculado ao item " +
                  details?.spendSheetItem.descricaoMaterial +
                  " do procedimento [" +
                  details?.spendSheetItem.fk_folha_gasto_circulante +
                  "]. Verifique"
              );
            } else {
              this.api
                .httpPut(`link-details-item/${this.procedimentoId}`, data)
                .subscribe(() => {
                  this.buscandoDetalhe = false;
                  document.getElementById("codigoDetalhe")?.focus();
                  this.listar.emit();
                  //focusTo(event, element, rowindex, this.registrosListagem);
                  this.api.showSuccess(
                    "Link com Sucesso!",
                    "O item foi vinculado com sucesso!"
                  );
                });
            }
          } else {
            //this.api.showInfo( "Link sem Sucesso!", "A operação não foi bem sucedida. O código [" + value + "] não foi encontrado");
            //focusTo(event, element, rowindex, this.registrosListagem);
            document.getElementById("lote")?.focus();
            this.buscandoDetalhe = false;
          }
        },
        complete: () => (this.buscandoDetalhe = false),
      });
    }
  }

  onClose() {
    this.close.emit();
  }
  save() {
    let obj = {
      id: 0,
      materialCode: this.formGroup.value.materialCode,
      descricaoMaterial: this.formGroup.value.descricaoMaterial,
      lote: this.formGroup.value.lote,
      qtdMaterial: 1,
      qtdPerda: 0,
      fornecedorId: this.formGroup.value.fornecedorId,
      procedureId: this.procedimentoId,
      comunicadoUso: this.formGroup.value.comunicadoUso,
    };
    this.api.saveItemAltoCusto(obj).subscribe({
      next: (data) => console.log(data),
      complete: () => {
        this.formGroup.reset();
        this.close.emit();
        //this.formGroup.value.CodigoMaterial.focus();
        document.getElementById('codigoDetalhe')?.focus();
      },
    });
  }
}

const focusTo = function (
  event: any,
  _element: any,
  rowindex: any,
  _registros: any
) {
  let { code, key, keyCode } = event;
  if (keyCode === 13 || keyCode === 9) {
    if (keyCode === 13 && rowindex < _registros.length - 1) {
      document.getElementById(`_${rowindex + 1}_CodigoMaterial`)?.focus();
    } else if (rowindex === _registros.length - 1)
      document.getElementById(`termo`)?.focus();
  }
};
