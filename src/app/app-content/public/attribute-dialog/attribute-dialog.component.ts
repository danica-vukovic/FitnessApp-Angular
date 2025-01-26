import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeValue } from '../../../models/attributes-value';
import { CategoryService } from '../../services/category.service';
import { Attribute } from '../../../models/attribute';
import { AttributeService } from '../../services/attribute.service';


@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './attribute-dialog.component.html',
  styleUrls: ['./attribute-dialog.component.css']

})
export class AttributeDialogComponent {

  attributes: Attribute[] = [];
  attributeValuesMap: Map<number, AttributeValue[]> = new Map();
  selectedAttributes: { [key: number]: string[] } = {};

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AttributeDialogComponent>,
    private attributeService: AttributeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadAttributes();
  }

  loadAttributes(): void {
    this.categoryService.getAttributesByCategoryId(this.data.category).subscribe((data) => {
      this.attributes = data;
      this.attributes.forEach((attribute) => {
        this.attributeValuesMap.set(attribute.idAttribute, []);
        this.selectedAttributes[attribute.idAttribute] = [];
        this.loadValues(attribute.idAttribute);
      });
    });
  }

  loadValues(attributeId: number): void {
    this.attributeService.getValuesByAttributeId(attributeId).subscribe((values) => {
      this.attributeValuesMap.set(attributeId, values);
    });
  }

  onValueChange(selectedValues: string[], attributeId: number): void {
    this.selectedAttributes[attributeId] = selectedValues;
  }

  saveAttributes(): void {
    const selectedAttributesArray = Object.entries(this.selectedAttributes).map(([id, values]) => ({
      attributeId: Number(id),
      values: values 
    }));
    this.dialogRef.close(selectedAttributesArray);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

