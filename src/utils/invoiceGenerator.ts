
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Buffer } from 'buffer';

interface UserData {
  name?: string;
  email?: string;
}

interface ClientDetails {
  name?: string;
  email_address?: string;
  phone_number?: string;
}

interface CaseDetails {
  case_number?: string;
  case_title?: string;
}

interface Invoice {
  invoice_number?: string;
  issue_date?: string;
  due_date?: string;
  amount: number;
  razorpay_payment_link?: string;
}

interface TimeEntry {
  description?: string;
  on_date?: string;
  hours?: number;
  rate?: number;
}

interface Expense {
  description?: string;
  on_date?: string;
  amount?: number;
}

export class InvoiceGenerator {
  static async generatePDF(
    invoice: Invoice,
    expenses: Expense[] = [],
    timeEntries: TimeEntry[] = [],
    userData: UserData = {},
    clientDetails: ClientDetails = {},
    caseDetails: CaseDetails = {}
  ): Promise<Buffer> {
    return new Promise((resolve) => {
      try {
        // Create a new jsPDF instance
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        // Helper to format date to DD/MM/YYYY
        const formatDateToIndian = (dateString?: string): string => {
          if (!dateString) return 'N/A';
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          } catch (e) {
            return 'Invalid Date';
          }
        };
        
        // Setup document properties
        doc.setProperties({
          title: `Invoice ${invoice.invoice_number || ''}`,
          author: userData.name || 'Legal Case Management System',
          subject: 'Invoice',
          creator: 'Legal Case Management System'
        });
        
        // Define colors
        const primaryColor = '#4f46e5'; // Indigo
        const secondaryColor = '#6b7280'; // Gray
        
        // Add invoice header
        doc.setFontSize(28);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('INVOICE', 200, 20, { align: 'right' });
        
        // Add line under the header
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(15, 25, 195, 25);
        
        // Provider info (From)
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.setFont('helvetica', 'normal');
        doc.text('FROM', 15, 40);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(userData.name || 'Lawyer Name', 15, 45);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(userData.email || '', 15, 50);
        
        // Invoice details (right column)
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.text('INVOICE DETAILS', 130, 40);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Invoice Number:', 130, 45);
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.invoice_number || 'N/A', 165, 45);
        
        doc.setFont('helvetica', 'bold');
        doc.text('Issue Date:', 130, 50);
        doc.setFont('helvetica', 'normal');
        doc.text(formatDateToIndian(invoice.issue_date), 165, 50);
        
        doc.setFont('helvetica', 'bold');
        doc.text('Due Date:', 130, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(formatDateToIndian(invoice.due_date), 165, 55);
        
        // Client info
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.text('TO', 15, 65);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(clientDetails?.name || 'Client Name', 15, 70);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        if (clientDetails?.email_address) {
          doc.text(clientDetails.email_address, 15, 75);
        }
        
        if (clientDetails?.phone_number) {
          doc.text(`Phone: ${clientDetails.phone_number}`, 15, 80);
        }
        
        // Case details
        if (caseDetails && (caseDetails.case_number || caseDetails.case_title)) {
          doc.setFontSize(10);
          doc.setTextColor(secondaryColor);
          doc.text('CASE INFORMATION', 15, 90);
          
          doc.setTextColor(0, 0, 0);
          doc.setFont('helvetica', 'normal');
          
          if (caseDetails.case_number) {
            doc.text(`Case Number: ${caseDetails.case_number}`, 15, 95);
          }
          
          if (caseDetails.case_title) {
            doc.text(`Case Title: ${caseDetails.case_title}`, 15, 100);
          }
        }
        
        // Prepare items for the table
        const tableData: Array<(string | number)[]> = [];
        
        // Add expenses to table data
        if (expenses && expenses.length > 0) {
          expenses.forEach(exp => {
            const amount = parseFloat(exp.amount?.toString() || '0');
            tableData.push([
              exp.description || 'N/A',
              formatDateToIndian(exp.on_date),
              'Expense',
              '-',
              '-',
              `₹${amount.toFixed(2)}`
            ]);
          });
        }
        
        // Add time entries to table data
        if (timeEntries && timeEntries.length > 0) {
          timeEntries.forEach(entry => {
            const hours = parseFloat(entry.hours?.toString() || '0');
            const rate = parseFloat(entry.rate?.toString() || '0');
            const amount = hours * rate;
            tableData.push([
              entry.description || 'N/A',
              formatDateToIndian(entry.on_date),
              'Service',
              hours.toFixed(2),
              `₹${rate.toFixed(2)}`,
              `₹${amount.toFixed(2)}`
            ]);
          });
        }
        
        // Create the table
        (doc as any).autoTable({
          startY: 110,
          head: [['Description', 'Date', 'Type', 'Hours', 'Rate', 'Amount']],
          body: tableData,
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [243, 244, 246]
          },
          columnStyles: {
            0: { cellWidth: 60 },
            5: { halign: 'right' }
          },
          styles: {
            font: 'helvetica',
            fontSize: 9
          }
        });
        
        const finalY = (doc as any).lastAutoTable.finalY || 150;
        
        // Total section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.text('TOTAL DUE:', 150, finalY + 10, { align: 'right' });
        doc.text(`₹${parseFloat(invoice.amount.toString()).toFixed(2)}`, 195, finalY + 10, { align: 'right' });
        
        // Payment instructions
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.text('PAYMENT INSTRUCTIONS', 15, finalY + 20);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('Please use the payment link sent to your email or contact us for alternative payment methods.', 15, finalY + 25);
        
        // Terms and conditions
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.text('TERMS AND CONDITIONS', 15, finalY + 35);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('Payment is due within 30 days of receipt. Late payments may be subject to additional charges.', 15, finalY + 40);
        
        // Payment link
        if (invoice.razorpay_payment_link) {
          doc.setFontSize(8);
          doc.setTextColor(primaryColor);
          doc.text('Pay Online: ', 15, finalY + 50);
          
          doc.setTextColor(0, 0, 255);
          doc.textWithLink(invoice.razorpay_payment_link, 35, finalY + 50, { url: invoice.razorpay_payment_link });
        }
        
        // Add page numbers
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(secondaryColor);
          doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
        }
        
        // Convert to buffer
        const arrayBuffer = doc.output('arraybuffer');
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
        
      } catch (error: any) {
        console.error(`[INVOICES] Error generating PDF: ${error.message}`);
        // Even in case of error, return an empty buffer rather than rejecting
        resolve(Buffer.from([]));
      }
    });
  }
}
