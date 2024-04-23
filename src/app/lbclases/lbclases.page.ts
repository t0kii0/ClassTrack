import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Student {
  name: string;
  grades: number[];
  average: number | null ; // Asegúrate de que la propiedad average pueda ser null
}

@Component({
  selector: 'app-lbclases',
  templateUrl: './lbclases.page.html',
  styleUrls: ['./lbclases.page.scss'],
})
export class LbclasesPage {
  students: Student[] = [
    { name: 'Juanito el bandolero', grades: [0, 0, 0, 0, 0], average: null  },
    { name: 'Angelo', grades: [0, 0, 0, 0, 0], average: null  },
    { name: 'Manuus', grades: [0, 0, 0, 0, 0], average: null  },
    // Agrega más alumnos según sea necesario
  ];

  calculateAllAverages(): void {
    this.students.forEach(student => {
      const validGrades = student.grades.filter(grade => grade !== null);
      if (validGrades.length === 0) {
        student.average = null ; 
      } else {
        const sum = validGrades.reduce((total, grade) => total + grade, 0);
        student.average = sum / validGrades.length;
      }
    });
  }
}
