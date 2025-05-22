
import PDFDocument from 'pdfkit';
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
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore - PDFDocument may have some type issues
        const doc = new PDFDocument({
          margin: 50,
          size: 'A4',
          info: {
            Title: `Invoice ${invoice.invoice_number || ''}`,
            Author: userData.name || 'Legal Case Management System',
          }
        });

        const buffers: Buffer[] = [];
        doc.on('data', (chunk: any) => buffers.push(Buffer.from(chunk)));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
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

        // Document styling
        const primaryColor = '#4f46e5'; // Indigo color
        const secondaryColor = '#6b7280'; // Gray color

        // Invoice Header with modern styling
        doc.fillColor(primaryColor)
           .fontSize(28)
           .font('Helvetica-Bold')
           .text('INVOICE', { align: 'right' });
        
        // Add a line under the header
        doc.moveTo(50, doc.y + 10)
           .lineTo(550, doc.y + 10)
           .strokeColor(primaryColor)
           .lineWidth(1)
           .stroke();
        doc.moveDown(1.5);

        // Invoice Details in two columns
        const detailsStartY = doc.y;
        // Left column
        doc.fontSize(10)
           .fillColor(secondaryColor)
           .font('Helvetica')
           .text('FROM', 50, detailsStartY)
           .fillColor('black')
           .fontSize(12)
           .font('Helvetica-Bold')
           .text(userData.name || 'Lawyer Name', 50, doc.y)
           .font('Helvetica')
           .fontSize(10)
           .text(userData.email || '')
           .moveDown(0.5);

        // Right column - Invoice Info
        const rightColumnX = 350;
        doc.fontSize(10)
           .fillColor(secondaryColor)
           .font('Helvetica')
           .text('INVOICE DETAILS', rightColumnX, detailsStartY)
           .fillColor('black')
           .fontSize(10)
           .font('Helvetica-Bold')
           .text('Invoice Number:', rightColumnX, doc.y, { continued: true })
           .font('Helvetica')
           .text(` ${invoice.invoice_number || 'N/A'}`)
           .font('Helvetica-Bold')
           .text('Issue Date:', rightColumnX, doc.y, { continued: true })
           .font('Helvetica')
           .text(` ${formatDateToIndian(invoice.issue_date)}`)
           .font('Helvetica-Bold')
           .text('Due Date:', rightColumnX, doc.y, { continued: true })
           .font('Helvetica')
           .text(` ${formatDateToIndian(invoice.due_date)}`);

        // Reset cursor position for client info
        doc.moveDown(1.5);
        
        // Client Info
        doc.fontSize(10)
           .fillColor(secondaryColor)
           .text('TO', 50)
           .fillColor('black')
           .fontSize(12)
           .font('Helvetica-Bold');
        
        if (clientDetails) {
          doc.text(clientDetails.name || 'Client Name')
             .font('Helvetica')
             .fontSize(10);
          
          if (clientDetails.email_address) {
            doc.text(clientDetails.email_address);
          }
          
          if (clientDetails.phone_number) {
            doc.text(`Phone: ${clientDetails.phone_number}`);
          }
        } else {
          doc.text("Client information not available");
        }

        // Case Details
        if (caseDetails && (caseDetails.case_number || caseDetails.case_title)) {
          doc.moveDown(1)
             .fontSize(10)
             .fillColor(secondaryColor)
             .text('CASE INFORMATION')
             .fillColor('black')
             .font('Helvetica');
          
          if (caseDetails.case_number) {
            doc.text(`Case Number: ${caseDetails.case_number}`);
          }
          
          if (caseDetails.case_title) {
            doc.text(`Case Title: ${caseDetails.case_title}`);
          }
        }
        
        doc.moveDown(1.5);

        // Table styling
        const tableTop = doc.y;
        const colWidths = {
          description: 200,
          date: 70,
          type: 60,
          hours: 40,
          rate: 50,
          amount: 70
        };
        const startX = doc.x;
        
        // Draw the table header background
        doc.fillColor(primaryColor)
           .rect(startX - 5, tableTop - 5, 
                 colWidths.description + colWidths.date + colWidths.type + 
                 colWidths.hours + colWidths.rate + colWidths.amount + 10, 25)
           .fill();

        // Table Headers with inverted coloring
        doc.fillColor('white')
           .fontSize(10)
           .font('Helvetica-Bold')
           .text('Description', startX, tableTop, { width: colWidths.description })
           .text('Date', startX + colWidths.description, tableTop, { width: colWidths.date, align: 'center' })
           .text('Type', startX + colWidths.description + colWidths.date, tableTop, { width: colWidths.type, align: 'center' })
           .text('Hours', startX + colWidths.description + colWidths.date + colWidths.type, tableTop, { width: colWidths.hours, align: 'right' })
           .text('Rate', startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours, tableTop, { width: colWidths.rate, align: 'right' })
           .text('Amount', startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours + colWidths.rate, tableTop, { width: colWidths.amount, align: 'right' });

        // Reset for table content
        doc.fillColor('black')
           .font('Helvetica')
           .moveDown(1.5);
        
        // Prepare all items
        const allItems: Array<{
          description: string;
          date: string;
          type: string;
          hours: string;
          rate: string;
          amount: string;
        }> = [];
        
        let totalAmountCalc = 0;

        // Process expenses
        if (expenses && expenses.length > 0) {
          expenses.forEach(exp => {
            const amount = parseFloat(exp.amount?.toString() || '0');
            allItems.push({
              description: exp.description || 'N/A',
              date: formatDateToIndian(exp.on_date),
              type: 'Expense',
              hours: '-',
              rate: '-',
              amount: amount.toFixed(2),
            });
            totalAmountCalc += amount;
          });
        }

        // Process time entries
        if (timeEntries && timeEntries.length > 0) {
          timeEntries.forEach(entry => {
            const hours = parseFloat(entry.hours?.toString() || '0');
            const rate = parseFloat(entry.rate?.toString() || '0');
            const amount = hours * rate;
            allItems.push({
              description: entry.description || 'N/A',
              date: formatDateToIndian(entry.on_date),
              type: 'Service',
              hours: hours.toFixed(2),
              rate: rate.toFixed(2),
              amount: amount.toFixed(2),
            });
            totalAmountCalc += amount;
          });
        }
        
        // Draw table rows with alternating background
        allItems.forEach((item, i) => {
          const y = doc.y;
          
          // Add subtle alternating row background
          if (i % 2 === 1) {
            doc.fillColor('#f3f4f6') // Light gray background
               .rect(startX - 5, y - 5, 
                     colWidths.description + colWidths.date + colWidths.type + 
                     colWidths.hours + colWidths.rate + colWidths.amount + 10, 25)
               .fill()
               .fillColor('black'); // Reset to black text
          }
          
          doc.fontSize(9);
          doc.text(item.description, startX, y, { width: colWidths.description });
          doc.text(item.date, startX + colWidths.description, y, { width: colWidths.date, align: 'center' });
          doc.text(item.type, startX + colWidths.description + colWidths.date, y, { width: colWidths.type, align: 'center' });
          doc.text(item.hours, startX + colWidths.description + colWidths.date + colWidths.type, y, { width: colWidths.hours, align: 'right' });
          doc.text(item.rate, startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours, y, { width: colWidths.rate, align: 'right' });
          doc.text(`₹${item.amount}`, startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours + colWidths.rate, y, { width: colWidths.amount, align: 'right' });
          
          // Ensure consistent row height
          doc.moveDown(1.2);
          
          // Simple pagination check
          if (doc.y > 700) {
            doc.addPage();
            // Redraw headers on new page if needed
            doc.fillColor(primaryColor)
               .rect(startX - 5, 50, 
                     colWidths.description + colWidths.date + colWidths.type + 
                     colWidths.hours + colWidths.rate + colWidths.amount + 10, 25)
               .fill();
            
            doc.fillColor('white')
               .fontSize(10)
               .font('Helvetica-Bold')
               .text('Description', startX, 55, { width: colWidths.description })
               .text('Date', startX + colWidths.description, 55, { width: colWidths.date, align: 'center' })
               .text('Type', startX + colWidths.description + colWidths.date, 55, { width: colWidths.type, align: 'center' })
               .text('Hours', startX + colWidths.description + colWidths.date + colWidths.type, 55, { width: colWidths.hours, align: 'right' })
               .text('Rate', startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours, 55, { width: colWidths.rate, align: 'right' })
               .text('Amount', startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours + colWidths.rate, 55, { width: colWidths.amount, align: 'right' });
            
            doc.fillColor('black')
               .font('Helvetica')
               .moveDown(1.5);
          }
        });
        
        // Add a separator line before total
        const totalLineY = doc.y + 5;
        doc.moveTo(startX - 5, totalLineY)
           .lineTo(startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours + colWidths.rate + colWidths.amount + 5, totalLineY)
           .lineWidth(1)
           .strokeColor('#d1d5db') // Light gray line
           .stroke();
        
        doc.moveDown(0.5);
        
        // Total Amount section with better formatting
        doc.font('Helvetica-Bold')
           .fontSize(12)
           .fillColor(primaryColor);
        
        const totalTextX = startX + colWidths.description + colWidths.date + colWidths.type + colWidths.hours;
        doc.text('TOTAL DUE:', totalTextX, doc.y, { width: colWidths.rate, align: 'right' });
        doc.text(`₹${parseFloat(invoice.amount.toString()).toFixed(2)}`, 
                totalTextX + colWidths.rate, doc.y - doc.currentLineHeight(), 
                { width: colWidths.amount, align: 'right' });
        
        doc.moveDown(2);
        
        // Payment Instructions with improved formatting
        const footerY = doc.y;
        doc.font('Helvetica-Bold')
           .fillColor(secondaryColor)
           .fontSize(10)
           .text('PAYMENT INSTRUCTIONS', 50, footerY);
           
        doc.font('Helvetica')
           .fillColor('black')
           .fontSize(9)
           .text('Please use the payment link sent to your email or contact us for alternative payment methods.', 50, doc.y);
        
        doc.moveDown(1);
        
        // Terms and conditions
        doc.font('Helvetica-Bold')
           .fillColor(secondaryColor)
           .fontSize(10)
           .text('TERMS AND CONDITIONS');
           
        doc.font('Helvetica')
           .fillColor('black')
           .fontSize(9)
           .text('Payment is due within 30 days of receipt. Late payments may be subject to additional charges.');
        
        // Footer with payment link
        const paymentLinkY = doc.page.height - 50;
        if (invoice.razorpay_payment_link) {
          doc.fontSize(8)
             .fillColor(primaryColor)
             .text('Pay Online: ', 50, paymentLinkY, { continued: true });
             
          doc.fillColor('blue')
             .text(invoice.razorpay_payment_link, { 
               underline: true,
               link: invoice.razorpay_payment_link 
             });
        }
        
        // Add page numbers
        const pageCount = doc.bufferedPageRange().count;
        for (let i = 0; i < pageCount; i++) {
          doc.switchToPage(i);
          doc.fillColor(secondaryColor)
             .fontSize(8)
             .text(
               `Page ${i + 1} of ${pageCount}`,
               50,
               doc.page.height - 50,
               { align: 'right' }
             );
        }
        
        doc.end();
      } catch (error: any) {
        console.error(`[INVOICES] Error generating PDF: ${error.message}`);
        reject(error);
      }
    });
  }
}
