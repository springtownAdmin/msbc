export const template01 = (base64, data) => {

return `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
    <title>Customer Enquiry</title>
</head>
<style>
    
    *{
        margin: 0 auto;
        padding: 0 auto;
        user-select: none;
        font-size: 12px;
        line-height: 15px;
    }

    body {
        padding: 20px;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .wrapper-invoice{
        display: flex;
        justify-content: center;
    }

    .wrapper-invoice .invoice {
        height: auto;
        background: #fff;
        max-width: 110vh;
        width: 100%;
        box-sizing: border-box;
    }

    .wrapper-invoice .invoice .invoice-information {
        float: right;
        text-align: right;
    }

    .wrapper-invoice .invoice .invoice-head {
        display: flex;
        margin-top: 8vh;
    }

    .wrapper-invoice .invoice .invoice-head .client-info {
        text-align: left;
    }

    .wrapper-invoice .invoice .invoice-head .head {
        width: 100%;
        box-sizing: border-box;
    }

    .wrapper-invoice .invoice .invoice-head .client-data {
        text-align: right;
    }

    .wrapper-invoice .invoice .invoice-head .head {
        width: 100%;
        box-sizing: border-box;
    }

    .wrapper-invoice .invoice .invoice-body {
        margin-top: 8vh;
    }

    .wrapper-invoice .invoice .invoice-body .table {
        border-collapse: collapse;
        width: 100%;
    }

    table, tr, td, th {
        padding: 5px;
    }

    th {
      background-color: rgb(255, 244, 222);
    }

    .wrapper-invoice .invoice .invoice-body .flex-table {
        display: flex;
    }

    .wrapper-invoice .invoice .invoice-body .flex-table .flex-column {
        width: 100%;
        box-sizing: border-box;
    }

    .wrapper-invoice .invoice .invoice-body .flex-table .flex-column .table-subtotal {
        border-collapse: collapse;
        box-sizing: border-box;
        width: 100%;
        margin-top: 2vh;
    }

    .wrapper-invoice .invoice .invoice-body .invoice-total-amount {
        margin-top: 1rem;
    }

    .wrapper-invoice .invoice .invoice-footer {
        margin-top: 4vh;
    }

    .customer-enquiry-title {
      text-transform: uppercase; 
      font-size: 25px; 
      display: flex; 
      width: 100%; 
      justify-content: flex-end; 
      letter-spacing: 1px;
    }

    .horizontal-line {
      display: flex; 
      width: 100%; 
      justify-content: flex-end;
    }

    .horizontal-line hr {
      border: 1px solid lightgray; 
      margin: 10px 0; 
      width: 270px;
    }

    .product-details-title {
      text-transform: uppercase;
      text-decoration: underline;
      font-weight: 500;
      margin-bottom: 2em;
    }

</style>
<body>
    <section class="wrapper-invoice">
        <div class="invoice">

            <div class="customer-enquiry-title">
              Customer Enquiry
            </div>

            <div class="horizontal-line">
              <hr />
            </div>

            <div class="invoice-information">
                <p><b>Enquiry No. </b>: ${data.enquiry_no}</p>
                <p><b>Date </b>: ${data.date}</p>
                <p><b>Site Reference </b>: ${data.site_reference}</p>
            </div>

            <div class="invoice-logo-brand">
              <img src="data:image/png;base64,${base64}" alt="logo-msbc" width="250" height="75" />
            </div>

            <hr />

            <div class="invoice-head" style="margin: 2em 0;">

                <div class="head client-info">
                  <p><strong>Enquiry By</strong>: ${data.enquiry_by}</p>
                  <p><strong>T</strong>: +91 ${data.t}</p>
                  <p><strong>M</strong>: +91 ${data.m}</p>
                  <p><strong>E</strong>: ${data.e}</p>
                </div>

                <div class="head client-data">

                  <table>
                    <tr>
                      <td><strong>Customer Name</strong></td>
                      <td>:</td>
                      <td>${data.customer_name}</td>
                    </tr>

                    <tr>
                      <td><strong>Contact Name</strong></td>
                      <td>:</td>
                      <td>${data.contact_name}</td>
                    </tr>

                    <tr>
                      <td><strong>Address</strong></td>
                      <td>:</td>
                      <td>${data.address}</td>
                    </tr>

                    <tr>
                      <td><strong>Billing Address</strong></td>
                      <td>:</td>
                      <td>${data.billing_address}</td>
                    </tr>

                    <tr>
                      <td><strong>Delivery Address</strong></td>
                      <td>:</td>
                      <td>${data.delivery_address}</td>
                    </tr>
                  </table>

                </div>

            </div>

            <hr />

            <div class="invoice-body" style="margin: 2em 0;">
              
                <div class="product-details-title">Product Details</div>

                <table class="table" border="1" class="product-details-table">
                  <thead>
                    <tr>
                      <th style="width: 70px;">SR No.</th>
                      <th style="width: 350px;">Description</th>
                      <th>Product Type</th>
                      <th style="width: 70px;">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    ${data.product_details.map((x, i) => {

                      return `
                        <tr>
                          <td>${i+1}</td>
                          <td>${x.description}</td>
                          <td>${x.product_name}</td>
                          <td>${x.quantity}</td>
                        </tr>
                      `

                    })}
   
                  </tbody>
                </table>

                <div style="position:absolute; bottom: 0; width:95%">
                <div class="flex-table">
                  <div class="flex-column"></div>
                  <div class="flex-column">
                    <table class="table-subtotal" border="1">
                      <tbody>
                        <tr>
                          <td>GSTN NO</td>
                          <td>24AABCI3272I12D</td>
                        </tr>
                        <tr>
                          <td>PAN No.</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                
                <hr style="margin-top: 2em;" />

                <div class="invoice-head" style="margin: 2em 0;">
                  
                  <div class="head client-info" style="width: 80%;">
                    <p><strong>www.dwerp.com</strong></p>
                    <p>Catalyst House</p>
                    <p>720, Centennid park</p>
                    <p>Elstree, Herts</p>
                    <p>GUJARAT</p>
                  </div>

                  <div class="head client-data" style="width: 20%;">

                    <table>

                      <tr>
                        <td><strong>T</strong>:</td>
                        <td>-</td>
                      </tr>

                      <tr>
                        <td><strong>M</strong>:</td>
                        <td>-</td>
                      </tr>

                      <tr>
                        <td><strong>E</strong>:</td>
                        <td>info@dwerp.com</td>
                      </tr>

                    </table>

                  </div>

              </div>
              </div>

            </div>

        </div>
    </section>
</body>
</html>
`

}