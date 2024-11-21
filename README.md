# Serverless


# **Lambda Function: Email Verification using SendGrid**

This repository contains a serverless AWS Lambda function designed to process SNS messages and send email verification links using the SendGrid API.

## **Prerequisites**
Before you begin, ensure you have the following: 
- **AWS Account**: For deploying and managing Lambda functions and SNS services.
- **SendGrid Account**: To generate an API key for email services.
- **Node.js Installed**: For local development and deployment.

## **Setup and Installation**
### **Step 1: Clone the Repository**
Clone this repository to your local machine:
```bash
git clone <repository_url>
cd <repository_name>
```

### **Step 2: Install Dependencies**
Install the required Node.js packages:
```bash
npm install
```

### **Step 3: Environment Variables**
Environment variables required for this project include the SendGrid API key and verified sender email. These are managed through **Terraform**. Update your Terraform configuration to set these variables during deployment.
Example variables:
```hcl
variable "sendgrid_api_key" {
  description = "SendGrid API key for email sending"
  type        = string
}

variable "sendgrid_from_email" {
  description = "Verified SendGrid sender email"
  type        = string
}
```
Ensure these variables are passed correctly during deployment.

## **Deployment**
### **Step 1: Configure AWS Lambda**
- Create an AWS Lambda function in your AWS Management Console.
- Add an **SNS trigger** to your Lambda function.

### **Step 2: Deploy with Terraform**
Use Terraform to manage the deployment of this Lambda function and its associated resources. Ensure your Terraform configuration includes environment variable settings.



npm install @sendgrid/mail pg
