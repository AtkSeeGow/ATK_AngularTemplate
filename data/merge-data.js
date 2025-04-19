const fs = require('fs');
const path = require('path');

const authenticationCanActivate = require('./AuthenticationCanActivate.json');
const authenticationGenerateToken = require('./AuthenticationGenerateToken.json');
const commonGetUserInfo = require('./CommonGetUserInfo.json');
const todoFetchBy = require('./TodoFetchBy.json');
const queryFetchBy = require('./QueryFetchBy.json');
const invoiceApplicationFormFindFormBy = require('./InvoiceApplicationFormFindFormBy.json');
const invoiceApplicationFormFetchInvoiceItemBy = require('./InvoiceApplicationFormFetchInvoiceItemBy.json');
const invoiceApplicationFormFetchBuyerBy = require('./InvoiceApplicationFormFetchBuyerBy.json');

const mergedData = {
  ...authenticationCanActivate,
  ...authenticationGenerateToken,
  ...commonGetUserInfo,
  ...todoFetchBy,
  ...queryFetchBy,
  ...invoiceApplicationFormFindFormBy,
  ...invoiceApplicationFormFetchInvoiceItemBy,
  ...invoiceApplicationFormFetchBuyerBy
};

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(mergedData, null, 2));