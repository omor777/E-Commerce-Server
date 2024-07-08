import dotenv from "dotenv";
dotenv.config();

const config = {
  sslcommerzUrl: process.env.SSLCOMMERZ_URL,
  sslcommerz: {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWD,
  },
  successUrl: process.env.SUCCESS_URL,
  failUrl: process.env.FAIL_URL,
  cancel: process.env.CANCEL_URL,
};

export default config;
