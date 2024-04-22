import { Component } from '@angular/core';

interface Student {
  name: string;
  grades: number[];
}

@Component({
  selector: 'app-lbclases',
  templateUrl: './lbclases.page.html',
  styleUrls: ['./lbclases.page.scss'],
})
export class LbclasesPage {
  students: Student[] = [
    { name: 'Alumno 1', grades: [0, 0, 0, 0, 0] },
    { name: 'Alumno 2', grades: [0, 0, 0, 0, 0] },
    { name: 'Alumno 3', grades: [0, 0, 0, 0, 0] },
    // Agrega más alumnos según sea necesario
  ];

  constructor() {}

  calculateAverage(grades: number[]): number {
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
  }

  updateGrade(studentIndex: number, gradeIndex: number, value: number) {
    this.students[studentIndex].grades[gradeIndex] = value;
  }
}
