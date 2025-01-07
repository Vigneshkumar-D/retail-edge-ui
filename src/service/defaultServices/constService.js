const baseUrl = process.env.REACT_APP_API + "/api";

// Login
export const LOGIN_URL = baseUrl + "/auth/login";
export const LOGOUT_URL = baseUrl + "/auth/logout";
export const FORGET_PASSWORD_URL = baseUrl + "/auth/forget-password";
export const RESET_PASSWORD_URL = baseUrl + "/auth/confirm-reset";

// Dashboard
export const DASHBOARD_URL = baseUrl + "/";

// Inventory Management - prodcut Management
export const PRODUCT_URL = baseUrl + "/product";
export const CATEGORY_URL = baseUrl + "/category";
export const STOCK_TRANSACTION_URL = baseUrl + "/stock-transaction";
export const LOW_STOCK_ALERT_URL = baseUrl + "/stock-alert";

// Inventory Management - Supplier Management
export const SUPPLIER_MANAGEMENT_URL = baseUrl + "/supplier-management";

// Sales and billing
export const INVOICE_GENERATION_URL = baseUrl + "/invoice";
export const ORDER_URL = baseUrl + "/order";

// Customer Engagement
export const CUSTOMER_URL = baseUrl + "/customer";
export const CREDIT_REMINDER_URL = baseUrl + "/credit-reminder";
export const OFFER_ALERT_URL = baseUrl + "/";
export const NOTIFICATION_URL = baseUrl + "/";

// Finance Management
export const ACCOUNTS_URL = baseUrl + "/";
export const EMI_URL = baseUrl + "/emi-details";
export const EXPENSE_CATEGORY_URL = baseUrl + "/expense-category";
export const EXPENSE_URL = baseUrl + "/expense";

// Business Insights
export const REPORTS_URL = baseUrl + "/";
export const ANALYTICS_URL = baseUrl + "/";

// Complaince and Service
export const GST_REPORT_URL = baseUrl + "/gst-report";
export const TAX_AND_HSN_CODE_URL = baseUrl + "/hsn-code";
export const PAID_SERVICES_URL = baseUrl + "/paid-service";
export const WARRANTY_SERVICES_URL = baseUrl + "/warranty-service";

// User Management

export const USER_URL = baseUrl + "/users";
export const CURRENT_USER_URL = baseUrl + "/users/current-user"
export const ROLE_URL = baseUrl + "/roles";
export const USER_ACCESS_URL = baseUrl + "/";
export const EMAIL_AND_SMS_CONFIGURATION_URL = baseUrl + "/";

// in app notification
export const IN_APP_NOTIFICATION = baseUrl + "/alerts/notify";

// Product Module
export const PRODUCT_LIST_URL = baseUrl + "/product";

//Purchase Order

export const PURCHASE_ORDER_URL = baseUrl + "/purchase-order";
export const SUPPLIER_URL = baseUrl + "/supplier-management";
export const PAYMENT_URL = baseUrl + "/payments";

export const SUPPLIER_DASHBOARD_PAYMENT_DETAIS =
  baseUrl + "/payments/last-three";
export const SUPPLIER_DASHBOARD_PURCHASE_ORDER_DETAIS =
  baseUrl + "/purchase-order/last-three";

// Store Configuration
export const STORE_URL = baseUrl + "/store-details";
export const STORE_ACCOUNT_URL = baseUrl + "/account-details";
export const GST_URL = baseUrl + "/gst-details";

//Settlement
export const SETTLEMENT_URL = baseUrl + "/settlement"