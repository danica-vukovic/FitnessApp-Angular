export class UserHasProgramRequest {
  programId: number;
  userId: number;

  constructor(programId: number, userId: number) {
    this.programId = programId;
    this.userId = userId;
  }
}