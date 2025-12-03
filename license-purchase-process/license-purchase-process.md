# LTAPPS Calendar PCF Control - License Purchase Process

This guide outlines the complete process for purchasing and activating a license for the LTAPPS Calendar PCF Control. The control uses a token-based licensing system to manage access and ensure proper authorization.

---

## Overview

The LTAPPS Calendar PCF Control is a paid commercial product that requires a valid license token to operate. The license is environment-specific and is managed through a secure token that you configure within the control.

**Key Points:**
- License is managed via a unique token
- Token is tied to your Power Apps Environment ID
- One-time purchase process with straightforward steps
- Immediate activation once token is configured

---

## License Purchase Process

### Step 1: Select Your License Plan

Choose the license plan that best fits your needs.
<!-- 
**Available License Plans:**

| Plan Type | Description | Best For |
|-----------|-------------|----------|
| **Single Environment** | Use in one Power Platform environment | Development, testing, or single production environment |
| **Multi-Environment** | Use in multiple specified environments (e.g., Dev, Test, Prod) | Organizations with separate environments |
| **Enterprise** | Organization-wide use with unlimited environments | Large organizations with multiple departments |
 -->
**To Select Your Plan:**

1. Visit our website: [https://ltaddins.com](https://ltaddins.com)
2. Navigate to the LTAPPS Calendar PCF Control product page
3. Review the available license plans and pricing
4. Select the plan that meets your requirements
5. Contact our sales team with your selection:
   - **Email:** support@ltaddins.com
   - **Phone:** +84 946 579 539

---

### Step 2: Receive Invoice from LTAPPS

Once you've selected your license plan, LTAPPS will provide you with an official invoice.

**What You'll Receive:**

- **Detailed Invoice** including:
  - License plan details
  - Pricing and payment amount
  - Bank account information for payment
  - Invoice number and date
  - Payment terms and conditions

**Important Information:**

The invoice will include our bank account details for payment transfer. Please review all information carefully before proceeding with payment.

---

### Step 3: Complete Payment and Provide Environment ID

This step involves two important actions that you need to complete:

#### 3A. Send Payment to Bank Account

**Payment Instructions:**

1. **Review Bank Details**
   - Carefully review the bank account information provided in the invoice
   - Verify the account number, bank name, and payment amount

2. **Transfer Payment**
   - Transfer the exact amount specified in the invoice
   - Use the invoice number as the payment reference
   - Keep a copy of the payment confirmation/receipt

3. **Confirm Payment**
   - Send payment confirmation to support@ltaddins.com
   - Include:
     - Payment receipt or confirmation screenshot
     - Invoice number
     - Date of payment
     - Your contact information

> **⚠️ IMPORTANT - NO REFUND POLICY:**
>
> **LTAPPS CANNOT REFUND PAYMENTS FOR ANY REASON due to legal requirements in our country of operation.** Please ensure you:
> - Have selected the correct license plan
> - Verified the payment amount and details
> - Obtained necessary approvals from your organization
> - Understand the license terms and conditions
>
> Once payment is made, it is **non-refundable** under any circumstances. Please contact us before payment if you have any questions or concerns.

#### 3B. Provide Your Power Apps Environment ID

You need to provide your Power Apps Environment ID so LTAPPS can create your license token.

**What is an Environment ID?**

The Environment ID is a unique identifier (GUID) for your Power Platform environment. It ensures your license token works only in your specified environment(s).

**How to Get Your Environment ID:**

For detailed step-by-step instructions on finding your Power Apps Environment ID, please refer to our comprehensive guide:

📖 **[How to Get Your Power Apps Environment ID](../common-pages/get-env-id.md)**

**Submit Your Environment ID:**

Send your Environment ID to LTAPPS via email:
- **Email:** support@ltaddins.com
- **Subject:** License Token Request - [Your Company Name]
- **Include:**
  - Invoice number
  - Environment ID(s) for your purchased license plan
  - Environment name(s) for reference
  - Your contact information

### Step 4: Receive Your License Token

After LTAPPS receives both your payment confirmation and Environment ID, we will create your license token.

**Processing Time:**

- Typical processing time: **1-2 business days**
- You will receive an email notification when your token is ready

**What You'll Receive:**

An email from LTAPPS containing:

1. **License Token**
   - A unique token string for your environment(s)
   - Format: `[encrypted-token-string]`

2. **Token Details**
   - Licensed environment ID(s)
   - License plan type
   - Issue date
   - License terms

3. **Activation Instructions**
   - Step-by-step guide to configure the token
   - Link to documentation

**Example Email Content:**

```
Subject: Your LTAPPS Calendar License Token

Dear Customer,

Thank you for your purchase! Your license token has been created.

License Token:
[Your-Unique-Token-String-Here]

Environment ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
License Plan: Single Environment
Issue Date: December 2, 2025

Please follow the activation instructions below to configure your license.

Best regards,
LTAPPS Support Team
```

---

### Step 5: Verify and Activate Your License

The final step is to add your license token to the LTAPPS Calendar PCF Control in your Power App.

#### For Model-Driven Apps

1. **Open Your App**
   - Navigate to [https://make.powerapps.com](https://make.powerapps.com)
   - Open your Model-Driven App in edit mode

2. **Locate the Calendar Control**
   - Open the form or view that contains the LTAPPS Calendar control

3. **Access Control Properties**
   - Select the calendar control
   - Open the properties panel

4. **Configure License Token**
   - Find the **"License Token"** property
   - Paste your license token string
   - Save the changes

5. **Publish**
   - Click **Publish** to apply the changes

6. **Verify Activation**
   - Open the app and navigate to the calendar
   - The control should now be fully functional
   - No trial or watermark messages should appear

#### For Canvas Apps

1. **Open Your Canvas App**
   - Navigate to [https://make.powerapps.com](https://make.powerapps.com)
   - Open your Canvas App in edit mode

2. **Select the Calendar Control**
   - Click on the LTAPPS Calendar control on your canvas

3. **Configure License Token Property**
   - In the properties panel, find the **"LicenseToken"** property
   - Paste your license token string into the property field

4. **Save and Publish**
   - Save your app
   - Click **Publish** → **Publish this version**

5. **Test the Control**
   - Play the app
   - Verify the calendar control functions without restrictions
   - Check that no trial limitations appear

#### For Custom Pages

1. **Open Your Custom Page**
   - Navigate to your solution in Power Apps
   - Open the custom page in edit mode

2. **Select the Calendar Control**
   - Click on the LTAPPS Calendar control

3. **Set License Token**
   - Find the **"License Token"** property
   - Enter your license token

4. **Save and Publish**
   - Save your changes
   - Publish the custom page

5. **Verify**
   - Open the custom page
   - Confirm the calendar operates with full functionality

---

## Verification Checklist

After activating your license, verify the following:

- [ ] Control loads without error messages
- [ ] No trial or evaluation watermarks appear
- [ ] All features are accessible (views, refiners, business rules, etc.)
- [ ] Action buttons work as configured
- [ ] No expiration warnings display
- [ ] Control functions properly in all scenarios

---

## Troubleshooting

### Problem: Token Not Accepted

**Possible Causes:**
- Token was copied incorrectly (missing characters or extra spaces)
- Token is for a different environment ID
- Token property name is incorrect

**Solutions:**
1. Double-check that you copied the entire token string
2. Verify there are no extra spaces or line breaks
3. Confirm the token matches your current environment ID
4. Contact support@ltaddins.com if the issue persists

### Problem: Trial Message Still Appears

**Possible Causes:**
- Token not properly saved
- App not published after token configuration
- Browser cache showing old version

**Solutions:**
1. Verify the token is saved in the control properties
2. Publish the app again
3. Clear browser cache and reload
4. Try accessing from a different browser or incognito mode

### Problem: Control Not Working After Token Added

**Possible Causes:**
- Incorrect property name
- Token format issue
- Environment mismatch

**Solutions:**
1. Verify you're using the correct property name (check documentation)
2. Ensure token is entered as plain text without formatting
3. Confirm you're in the correct environment
4. Contact support with screenshots and details

---

## Important Reminders

### Payment Policy

- ⚠️ **Payments are non-refundable** due to legal requirements
- Verify all details before making payment
- Contact support if you have questions before purchasing

### Token Security

- 🔒 Keep your license token secure and confidential
- Do not share tokens publicly or with unauthorized users
- Each token is unique to your environment(s)
- Unauthorized distribution violates license terms

### License Compliance

- ✅ Use the control only in licensed environments
- ✅ Comply with the terms of your purchased license plan
- ✅ Renew licenses before expiration (if applicable)
- ❌ Do not use the token in unlicensed environments

### Support

- 📧 Contact support for any issues: support@ltaddins.com
- 📞 Phone support available: +84 946 579 539
- 🌐 Documentation: [https://ltaddins.com](https://ltaddins.com)

---

## Contact Information

For questions, support, or assistance with the license purchase process:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

**Business Hours:**
- Monday - Friday: 9:00 AM - 6:00 PM (GMT+7)
- Response time: Within 24 hours on business days

---

## Related Documentation

- [License Agreement (LICENSE.md)](../LICENSE.md)
- [How to Get Your Power Apps Environment ID](../common-pages/get-env-id.md)
- [Main Configuration Guide](../configurations/configuration.md)
- [Model-Driven Apps Installation Guide](../apps/modeldrivenapp.md)
- [Canvas Apps Installation Guide](../apps/canvas-custompage.md)

---

**Last Updated:** December 2, 2025  
**Version:** 1.0
