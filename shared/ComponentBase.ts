import { Observable } from "rxjs";
import { OnInit, Directive, EventEmitter, Output, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, Validators } from "@angular/forms";

@Directive()
export class ComponentBase {
  datemask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

  private _paramId!: number;
  public get paramId(): number {
    return this._paramId;
  }
  public set paramId(value: number) {
    this._paramId = value;
  }
  private _registrosListagem: any[] = [];
  public get registrosListagem(): any[] {
    return this._registrosListagem;
  }
  public set registrosListagem(value: any[]) {
    this._registrosListagem = value;
  }

  private _currentRecord: any;
  public get currentRecord(): any {
    return this._currentRecord;
  }
  public set currentRecord(value: any) {
    this._currentRecord = value;
  }

  private _formGroup!: FormGroup;
  public get formGroup(): FormGroup {
    return this._formGroup;
  }
  public set formGroup(value: FormGroup) {
    this._formGroup = value;
  }

  GetParam(name: string) {
    const results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    if (!results) {
      return 0;
    }
    return results[1] || 0;
  }

  public dataSource!: MatTableDataSource<any>;

  public fromBase64(chave: string): string {
    return atob(chave);
  }

  setValidators(item: any, field: string) {
    if (item) this.formGroup.controls[field].clearValidators();
    else this.formGroup.controls[field].setValidators([Validators.required]);
  }

  setIfNull(
    currentValue: any,
    fieldName: any,
    isNull = true,
    isEmpty = true,
    isUndefined = true
  ) {
    let nextValue = localStorage.getItem(fieldName);

    console.log("setIfNull", fieldName, currentValue, nextValue);
    if (isNull && currentValue === null) return nextValue;
    if (isUndefined && currentValue === undefined) return nextValue;
    if (isEmpty && currentValue === "") return nextValue;
    return currentValue;
  }
}
