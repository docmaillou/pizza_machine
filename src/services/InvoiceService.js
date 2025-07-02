import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';

class InvoiceService {
    constructor() {
        this.companyInfo = {
            name: 'Pizza Barbas',
            address: '123 Rue de la Pizza',
            city: 'Montréal, QC H1A 1A1',
            phone: '(514) 123-4567',
            email: 'info@pizzabarbas.com',
            website: 'www.pizzabarbas.com'
        };
    }

    // Generate HTML invoice template
    generateInvoiceHTML(transaction) {
        const {
            id,
            amountFormatted,
            tipFormatted,
            totalFormatted,
            timestamp,
            paymentMethod,
            employeeId
        } = transaction;

        const formattedDate = timestamp.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedTime = timestamp.toLocaleTimeString('fr-FR');

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Facture ${id}</title>
            <style>
                body {
                    font-family: 'Helvetica', Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                    background-color: #fff;
                }
                .invoice-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .company-name {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .company-info {
                    font-size: 14px;
                    opacity: 0.9;
                    line-height: 1.4;
                }
                .invoice-details {
                    padding: 30px;
                }
                .invoice-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #667eea;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .transaction-info {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                }
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding: 5px 0;
                }
                .info-label {
                    font-weight: 600;
                    color: #666;
                }
                .info-value {
                    color: #333;
                }
                .amounts-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .amounts-table th,
                .amounts-table td {
                    padding: 15px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }
                .amounts-table th {
                    background: #f8f9fa;
                    font-weight: 600;
                    color: #666;
                }
                .total-row {
                    background: #667eea;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    border-top: 1px solid #eee;
                }
                .thank-you {
                    font-size: 18px;
                    color: #667eea;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <div class="company-name">${this.companyInfo.name}</div>
                    <div class="company-info">
                        ${this.companyInfo.address}<br>
                        ${this.companyInfo.city}<br>
                        Tél: ${this.companyInfo.phone}<br>
                        Email: ${this.companyInfo.email}
                    </div>
                </div>
                
                <div class="invoice-details">
                    <div class="invoice-title">FACTURE</div>
                    
                    <div class="transaction-info">
                        <div class="info-row">
                            <span class="info-label">Numéro de transaction:</span>
                            <span class="info-value">${id}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Date:</span>
                            <span class="info-value">${formattedDate}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Heure:</span>
                            <span class="info-value">${formattedTime}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Méthode de paiement:</span>
                            <span class="info-value">${this.getPaymentMethodLabel(paymentMethod)}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Caissier:</span>
                            <span class="info-value">${employeeId}</span>
                        </div>
                    </div>
                    
                    <table class="amounts-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th style="text-align: right;">Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sous-total</td>
                                <td style="text-align: right;">${amountFormatted} $</td>
                            </tr>
                            <tr>
                                <td>Pourboire</td>
                                <td style="text-align: right;">${tipFormatted} $</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>TOTAL</strong></td>
                                <td style="text-align: right;"><strong>${totalFormatted} $</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="footer">
                    <div class="thank-you">Merci de votre visite !</div>
                    <div>
                        ${this.companyInfo.website}<br>
                        Conservez cette facture pour vos dossiers
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Get payment method label in French
    getPaymentMethodLabel(method) {
        const labels = {
            'card': 'Carte de crédit/débit',
            'nfc': 'Paiement sans contact',
            'cash': 'Espèces'
        };
        return labels[method] || method;
    }

    // Generate PDF invoice
    async generatePDF(transaction) {
        try {
            const html = this.generateInvoiceHTML(transaction);

            const { uri } = await Print.printToFileAsync({
                html,
                base64: false,
                width: 612,
                height: 792,
            });

            return {
                success: true,
                uri,
                filename: `facture_${transaction.id}.pdf`
            };
        } catch (error) {
            console.error('Error generating PDF:', error);
            return {
                success: false,
                error: 'Erreur lors de la génération du PDF'
            };
        }
    }

    // Share invoice (save to device or share)
    async shareInvoice(transaction) {
        try {
            const pdfResult = await this.generatePDF(transaction);

            if (!pdfResult.success) {
                return pdfResult;
            }

            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(pdfResult.uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Partager la facture',
                    UTI: 'com.adobe.pdf'
                });

                return {
                    success: true,
                    message: 'Facture partagée avec succès'
                };
            } else {
                return {
                    success: false,
                    error: 'Partage non disponible sur cet appareil'
                };
            }
        } catch (error) {
            console.error('Error sharing invoice:', error);
            return {
                success: false,
                error: 'Erreur lors du partage de la facture'
            };
        }
    }

    // Send invoice by email
    async sendInvoiceByEmail(transaction, recipientEmail) {
        try {
            const pdfResult = await this.generatePDF(transaction);

            if (!pdfResult.success) {
                return pdfResult;
            }

            const isAvailable = await MailComposer.isAvailableAsync();
            if (!isAvailable) {
                return {
                    success: false,
                    error: 'Service email non disponible sur cet appareil'
                };
            }

            const emailOptions = {
                recipients: [recipientEmail],
                subject: `Facture ${transaction.id} - ${this.companyInfo.name}`,
                body: `Bonjour,

Veuillez trouver ci-joint votre facture pour la transaction ${transaction.id}.

Détails de la transaction:
- Date: ${transaction.timestamp.toLocaleDateString('fr-FR')}
- Montant: ${transaction.amountFormatted} $
- Pourboire: ${transaction.tipFormatted} $
- Total: ${transaction.totalFormatted} $

Merci de votre visite !

${this.companyInfo.name}
${this.companyInfo.phone}
${this.companyInfo.email}`,
                attachments: [pdfResult.uri],
                isHtml: false
            };

            const result = await MailComposer.composeAsync(emailOptions);

            if (result.status === 'sent') {
                return {
                    success: true,
                    message: 'Facture envoyée par email avec succès'
                };
            } else if (result.status === 'saved') {
                return {
                    success: true,
                    message: 'Email sauvegardé en brouillon'
                };
            } else {
                return {
                    success: false,
                    error: 'Envoi annulé par l\'utilisateur'
                };
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return {
                success: false,
                error: 'Erreur lors de l\'envoi de l\'email'
            };
        }
    }

    // Send invoice by SMS
    async sendInvoiceBySMS(transaction, phoneNumber = '+14501115415') {
        try {
            const isAvailable = await SMS.isAvailableAsync();
            if (!isAvailable) {
                return {
                    success: false,
                    error: 'Service SMS non disponible sur cet appareil'
                };
            }

            // Create a concise SMS message with transaction details
            const smsMessage = `🍕 Pizza Barbas - Facture ${transaction.id}

📅 ${transaction.timestamp.toLocaleDateString('fr-FR')}
⏰ ${transaction.timestamp.toLocaleTimeString('fr-FR')}

💰 Sous-total: ${transaction.amountFormatted} $
💡 Pourboire: ${transaction.tipFormatted} $
💳 TOTAL: ${transaction.totalFormatted} $

Merci de votre visite !
${this.companyInfo.phone}`;

            const result = await SMS.sendSMSAsync(
                [phoneNumber],
                smsMessage
            );

            if (result.result === 'sent') {
                return {
                    success: true,
                    message: 'Facture envoyée par SMS avec succès'
                };
            } else if (result.result === 'cancelled') {
                return {
                    success: false,
                    error: 'Envoi SMS annulé par l\'utilisateur'
                };
            } else {
                return {
                    success: false,
                    error: 'Erreur lors de l\'envoi du SMS'
                };
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
            return {
                success: false,
                error: 'Erreur lors de l\'envoi du SMS'
            };
        }
    }

    // Send invoice with PDF attachment via SMS (if supported)
    async sendInvoiceWithPDFBySMS(transaction, phoneNumber = '+14501115415') {
        try {
            // Generate PDF first
            const pdfResult = await this.generatePDF(transaction);

            if (!pdfResult.success) {
                return pdfResult;
            }

            const isAvailable = await SMS.isAvailableAsync();
            if (!isAvailable) {
                return {
                    success: false,
                    error: 'Service SMS non disponible sur cet appareil'
                };
            }

            // Create message with link to PDF (simplified approach)
            const smsMessage = `🍕 Pizza Barbas - Facture ${transaction.id}

📅 ${transaction.timestamp.toLocaleDateString('fr-FR')}
💳 Total: ${transaction.totalFormatted} $

Votre facture PDF a été générée.
Pour plus de détails, contactez-nous:
${this.companyInfo.phone}

Merci de votre visite !`;

            const result = await SMS.sendSMSAsync(
                [phoneNumber],
                smsMessage
            );

            if (result.result === 'sent') {
                // Also try to share the PDF separately
                const shareResult = await this.shareInvoice(transaction);
                return {
                    success: true,
                    message: 'SMS envoyé avec succès. PDF disponible pour partage.',
                    pdfGenerated: true
                };
            } else if (result.result === 'cancelled') {
                return {
                    success: false,
                    error: 'Envoi SMS annulé par l\'utilisateur'
                };
            } else {
                return {
                    success: false,
                    error: 'Erreur lors de l\'envoi du SMS'
                };
            }
        } catch (error) {
            console.error('Error sending SMS with PDF:', error);
            return {
                success: false,
                error: 'Erreur lors de l\'envoi du SMS'
            };
        }
    }
}

export default new InvoiceService();
