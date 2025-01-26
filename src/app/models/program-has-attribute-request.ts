export class ProgramHasAttributeRequest {
    programId: number;
    attributeId: number;
    value: string;
  
    constructor(programId: number, attributeId: number, value: string) {
      this.programId = programId;
      this.attributeId = attributeId;
      this.value = value;
    }
  }
  