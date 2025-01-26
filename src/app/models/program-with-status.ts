import { Program } from './program';

export class ProgramWithStatus {
  program: Program;
  isFinished: boolean;

  constructor(program: Program, isFinished: boolean) {
    this.program = program;
    this.isFinished = isFinished;
  }
}
