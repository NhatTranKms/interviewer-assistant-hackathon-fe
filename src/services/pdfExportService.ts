import jsPDF from 'jspdf';
import type { InterviewQuestion, CandidateInfo } from '../models';

interface PDFConfig {
  pageHeight: number;
  margin: number;
  lineHeight: number;
  maxWidth: number;
  colors: {
    primary: [number, number, number];
    secondary: [number, number, number];
    technical: [number, number, number];
    behavioral: [number, number, number];
    screening: [number, number, number];
    scores: {
      [key: number]: [number, number, number];
    };
  };
}

export class PDFExportService {
  private pdf: jsPDF;
  private config: PDFConfig;
  private yPosition: number = 20;

  constructor() {
    this.pdf = new jsPDF();
    this.config = {
      pageHeight: this.pdf.internal.pageSize.height,
      margin: 20,
      lineHeight: 7,
      maxWidth: 170,
      colors: {
        primary: [37, 99, 235], // Blue-600
        secondary: [75, 85, 99], // Gray-600
        technical: [37, 99, 235], // Blue-600
        behavioral: [16, 185, 129], // Emerald-500
        screening: [245, 158, 11], // Amber-500
        scores: {
          5: [16, 185, 129],   // Emerald-500
          4: [59, 130, 246],   // Blue-500
          3: [245, 158, 11],   // Amber-500
          2: [239, 68, 68],    // Red-500
          1: [153, 27, 27]     // Red-800
        }
      }
    };
  }

  private addText(
    text: string, 
    fontSize: number = 12, 
    isBold: boolean = false, 
    color: [number, number, number] = [0, 0, 0],
    x: number = this.config.margin
  ): number {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    this.pdf.setTextColor(color[0], color[1], color[2]);
    
    const lines = this.pdf.splitTextToSize(text, this.config.maxWidth);
    
    if (this.yPosition + (lines.length * this.config.lineHeight) > this.config.pageHeight - 20) {
      this.pdf.addPage();
      this.yPosition = 20;
    }
    
    lines.forEach((line: string) => {
      this.pdf.text(line, x, this.yPosition);
      this.yPosition += this.config.lineHeight;
    });
    
    this.pdf.setTextColor(0, 0, 0);
    return this.yPosition;
  }

  private addHeader(candidateInfo: CandidateInfo): void {
    this.addText(
      `Interview Questions for ${candidateInfo.title} (${candidateInfo.seniorityLevel})`,
      16,
      true,
      this.config.colors.primary
    );
    this.yPosition += 3;
    
    if (candidateInfo.interviewSimulator) {
      this.addText(
        `${candidateInfo.interviewSimulator} Style`,
        12,
        false,
        this.config.colors.secondary
      );
      this.yPosition += 5;
    } else {
      this.yPosition += 3;
    }
  }

  private getCategoryColor(category: string): [number, number, number] {
    switch (category) {
      case 'Technical': return this.config.colors.technical;
      case 'Behavioral': return this.config.colors.behavioral;
      case 'Screening': return this.config.colors.screening;
      default: return [0, 0, 0];
    }
  }

  private addCategorySection(category: string, questions: InterviewQuestion[]): void {
    if (questions.length === 0) return;

    const categoryColor = this.getCategoryColor(category);

    // Add category header
    this.addText(
      `${category} Questions (${questions.length})`,
      14,
      true,
      categoryColor
    );
    this.yPosition += 2;

    // Add questions
    questions.forEach((question, index) => {
      this.addQuestion(question, index + 1);
    });

    this.yPosition += 5;
  }

  private addQuestion(question: InterviewQuestion, questionNumber: number): void {
    // Question text
    this.addText(
      `Q${questionNumber}. ${question.question}`,
      12,
      true,
      [31, 41, 55]
    );
    this.yPosition += 1;

    // Expected Answer
    this.addText('Expected Answer:', 11, true, [55, 65, 81]);
    this.addText(question.expectedAnswer, 10);
    this.yPosition += 1;

    // Evaluation Criteria
    this.addText('Evaluation Criteria:', 11, true, [55, 65, 81]);
    if (Array.isArray(question.evaluationCriteria)) {
      question.evaluationCriteria.forEach((criteria) => {
        this.addText(`• ${criteria}`, 10);
      });
    } else {
      this.addText(question.evaluationCriteria, 10);
    }
    this.yPosition += 1;

    // Scoring Guide
    if (question.scoringGuide) {
      this.addText('Scoring Guide:', 11, true, [55, 65, 81]);
      question.scoringGuide.forEach((score) => {
        const scoreColor = this.config.colors.scores[score.stars] || [0, 0, 0];
        this.addText(
          `${score.stars}/5 - ${score.description}`,
          10,
          false,
          scoreColor
        );
      });
    }
    
    this.yPosition += 5;
  }

  public exportInterviewQuestions(
    candidateInfo: CandidateInfo,
    questionsByCategory: Record<string, InterviewQuestion[]>
  ): void {
    this.addHeader(candidateInfo);

    (['Technical', 'Behavioral', 'Screening'] as const).forEach((category) => {
      this.addCategorySection(category, questionsByCategory[category]);
    });

    const fileName = `Interview_Questions_${candidateInfo.title}_${candidateInfo.seniorityLevel}.pdf`;
    this.pdf.save(fileName);
  }
}