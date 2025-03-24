export interface ReceiptData {
  id: number;
  date: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: string;
}

export function generateReceiptHTML(data: ReceiptData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>領収書</title>
      <style>
        body {
          font-family: 'Helvetica', sans-serif;
          margin: 0;
          padding: 40px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #ccc;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #000;
        }
        .title {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .invoice-number {
          color: #666;
          font-size: 14px;
        }
        .content {
          margin: 40px 0;
        }
        .row {
          display: flex;
          margin-bottom: 15px;
        }
        .label {
          width: 120px;
          color: #666;
        }
        .value {
          flex: 1;
        }
        .amount {
          text-align: center;
          font-size: 24px;
          margin: 30px 0;
          padding: 20px;
          background: #f8f8f8;
        }
        .footer {
          margin-top: 60px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .stamp {
          position: absolute;
          right: 80px;
          bottom: 150px;
          width: 100px;
          height: 100px;
          border: 3px solid #f00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f00;
          font-size: 16px;
          transform: rotate(-15deg);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="title">領収書</div>
          <div class="invoice-number">No. ${data.invoiceNumber}</div>
        </div>
        
        <div class="content">
          <div class="row">
            <div class="label">発行日</div>
            <div class="value">${data.date}</div>
          </div>
          
          <div class="amount">
            ¥${data.amount.toLocaleString()}
          </div>
          
          <div class="row">
            <div class="label">支払方法</div>
            <div class="value">${data.paymentMethod}</div>
          </div>
        </div>
        
        <div class="stamp">領収済</div>
        
        <div class="footer">
          <p>株式会社サンプル</p>
          <p>〒100-0001 東京都千代田区千代田1-1</p>
          <p>Tel: 03-1234-5678</p>
        </div>
      </div>
    </body>
    </html>
  `;
}