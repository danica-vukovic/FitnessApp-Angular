export class ActivityLogRequest {
    exerciseType: ExerciseType;
    duration: number;
    result: number;
    intensity: string;
    bodyWeight: number;
    userId: number;
  
    constructor(
      exerciseType: ExerciseType,
      duration: number,
      result: number,
      intensity: string,
      bodyWeight: number,
      userId: number
    ) {
      this.exerciseType = exerciseType;
      this.duration = duration;
      this.result = result;
      this.intensity = intensity;
      this.bodyWeight = bodyWeight;
      this.userId = userId;
    }
  }
  
  export enum ExerciseType {
    CARDIO,
    STRENGTH,
    HIIT,
  }

  